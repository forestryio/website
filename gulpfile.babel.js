import BrowserSync from "browser-sync"
import del from "del"
import gulp from "gulp"
import gutil from "gulp-util"
import gulpif from "gulp-if"
import hugo from "hugo-bin"
import merge from "merge-stream"
import named from "vinyl-named"
import path from "path"
import postcss from "gulp-postcss"
import rename from "gulp-rename";
import runsequence from "run-sequence"
import {spawnSync} from "child_process"
import webpack from "webpack-stream"
import webpackConfig from "./webpack.config"

/**
 * Configuration
 */

// Directories
const srcDir = "src/"
const hugoDir = "hugo/"
const tmpDir = ".tmp/"
const buildDir = "dist/"

// Conditionals
const env = (process.env.NODE_ENV) ? process.env.NODE_ENV : "development"
const isProduction = (env === "production")

// Build Arguments
const argsDefault = ["-v", "--source", path.resolve(hugoDir), "--destination", (isProduction) ? path.resolve(buildDir) : path.resolve(tmpDir)]
const argsDevelopment = ["--buildDrafts", "--buildFuture", "--buildExpired"]

// Make env available to Hugo
process.env.HUGO_ENV = env

/**
 * Gulp tasks
 */

// Initialize BrowserSync
const browserSync = BrowserSync.create()

// Run development server with BrowserSync
gulp.task("server", ["build"], () => {
  browserSync.init({
    server: {
      baseDir: (isProduction) ? buildDir : tmpDir
    }
  })

  gulp.watch(path.normalize(srcDir + "/js/**/*.js"), ["js"])
  gulp.watch(path.normalize(srcDir + "/css/**/*.{css,scss,sass}"), ["css"])
  gulp.watch(
    [
      path.normalize(hugoDir) + "/content/**/*",
      "!" + path.normalize(hugoDir) + "/static/css/**/*",
      "!" + path.normalize(hugoDir) + "/static/js/**/*"
    ],
    ["hugo"]
  )
})

// Runs build tasks
gulp.task("build", ["clean"], (cb) => {
  runsequence(["css"], "hugo", cb)
})

// Run Hugo
gulp.task("hugo", (cb) => build(cb))

// Compile CSS with PostCSS
gulp.task("css", (cb) => {
  const src = path.normalize(srcDir + "/css/*.{css,scss,sass}")

  // Generate production CSS, send to hugo/
  const production = gulp.src(src)
    .pipe(postcss({env: "production"}).on("error", (err) => log(err, err.toString(), "PostCSS")))
    .pipe(rename({extname: ".min.css"}))  // rename
    .pipe(gulp.dest(path.normalize(hugoDir + "/static/css")))
    .pipe(gulpif(isProduction, gulp.dest(path.normalize(buildDir + "/css"))))
    .pipe(gulpif(isProduction, browserSync.stream()))

  // Generate development CSS, send to .tmp/
  const development = gulp.src(src)
    .pipe(gulpif(!isProduction, postcss({env: "development"})
      .on("error", (err) => log(err, err.toString(), "PostCSS"))))
    .pipe(gulpif(!isProduction, rename({extname: ".min.css"})))  // rename
    .pipe(gulpif(!isProduction, gulp.dest(path.normalize(tmpDir + "/css"))))
    .pipe(gulpif(!isProduction, browserSync.stream()))

  return merge(production, development)
})

// Compile JS with webpack
gulp.task("js", (cb) => {
  const src = path.normalize(srcDir + "/js/*.js")

  // Generate production JS, send to hugo/
  const production = gulp.src(src)
    .pipe(named())
    .pipe(webpack(Object.assign(webpackConfig, {devtool: "nosource-source-maps"}), null, (err, stats) => {
      log(err, stats.toString({colors: true, errors: true}), "webpack")
    }))
    .pipe(rename({extname: ".min.js"}))  // rename
    .pipe(gulp.dest(path.normalize(hugoDir + "/static/js")))
    .pipe(gulpif(isProduction, gulp.dest(path.normalize(buildDir + "/js"))))
    .pipe(gulpif(isProduction, browserSync.stream()))

  // Generate development JS, send to .tmp/
  const development = gulp.src(src)
    .pipe(gulpif(!isProduction, named()))
    .pipe(gulpif(!isProduction, webpack(Object.assign(webpackConfig, {devtool: "eval-source-maps"}), null, (err, stats) => {
      log(err, stats.toString({colors: true, errors: true}), "webpack")
    })))
    .pipe(gulpif(!isProduction, rename({extname: ".min.js"})))  // rename
    .pipe(gulpif(!isProduction, gulp.dest(path.normalize(tmpDir + "/js"))))
    .pipe(gulpif(!isProduction, browserSync.stream()))

  return merge(production, development)
})

// Remove build directories
gulp.task("clean", (cb) => {
  return del([tmpDir, buildDir])
})

/**
 * Helper functions
 */

// Execute Hugo with Build Arguments
function build(cb) {
  const args = (isProduction) ? argsDefault : argsDefault.concat(argsDevelopment)
  const Hugo = spawnSync(hugo, args, {stdio: "pipe", encoding: "utf-8"})

  if (Hugo.error) {
    log(Hugo.error, Hugo.error.toString(), "Hugo")
    browserSync.notify("Build Failed")
    return cb("Build failed")
  }

  if (Hugo.output) {
    log(null, Hugo.output.toString(), "Hugo")
  }

  browserSync.reload()

  return cb()
}

// Handle logging & errors
function log(err, log, name) {
  const messages = log.replace(/^,|,$/g, "").split("\n") // Get rid leading/trailing commas
  const spacer = " ".repeat(name.length + 2) // Indent additional lines

  if (err) throw new gutil.PluginError(name, err)

  messages.forEach((message, i) => {
    if (i === 0) {
      gutil.log("[" + gutil.colors.blue(name) + "]", message)
    } else {
      gutil.log(spacer, message)
    }
  })
}

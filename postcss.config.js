module.exports = (ctx) => {
  var file = ctx.file
  var opts = ctx.options

  return {
    parser: opts.parser ? opts.parser : false,
    map: (opts.env === "production") ? {inline: false} : false,
    plugins: {
      "precss": {},
      "postcss-cssnext": {},
      "postcss-if-media": {},
      "postcss-clean": {compatibility: "ie8"},
      "postcss-browser-reporter": {},
      "postcss-reporter": {}
    }
  }
}

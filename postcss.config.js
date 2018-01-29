module.exports = (ctx) => {
  var file = ctx.file
  var opts = ctx.options

  let config = {
    parser: opts.parser ? opts.parser : require("postcss-scss"),
    map: (opts.env === "production") ? {inline: false} : false,
    plugins: {
      "precss": {},
      "postcss-cssnext": {},
      "postcss-if-media": {},
      "postcss-reporter": {},
      "postcss-browser-reporter": {}
    }
  }

  return config
}

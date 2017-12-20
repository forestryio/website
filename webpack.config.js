import webpack from "webpack"

export default {
  module: {
    rules: [
      {
        test: /\.((png)|(eot)|(woff)|(woff2)|(ttf)|(svg)|(gif))(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader?name=/[hash].[ext]"
      },
      {test: /\.json$/, loader: "json-loader"},
      {
        loader: "babel-loader",
        test: /\.js?$/,
        exclude: /node_modules/,
        query: {cacheDirectory: true}
      }
    ]
  },

  devtool: "source-map",

  plugins: [
    new webpack.ProvidePlugin({
      "fetch": "imports-loader?this=>global!exports?global.fetch!whatwg-fetch"
    }),
    new webpack.optimize.UglifyJsPlugin({
      "sourcemap": true
    })
  ],

  externals: {
    // Any third-party deps added via a <script> tag
    // can be defined here so that they can be required
    // in your application's JS files
    jquery: "jQuery"
  },

  output: {
    path: __dirname + "/js/",
    filename: "[name].js"
  }
}

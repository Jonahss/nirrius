var
  webpack = require("webpack"),
  WebpackDevServer = require("webpack-dev-server"),
  config = require("./webpack.config")

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true
}).listen(8080, "localhost", function (err) {
  if (err) {
    console.log(err)
  }

  console.log("Listening at localhost:3000")
})
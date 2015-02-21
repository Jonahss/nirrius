var
  ENVIRONMENT = process.env.NODE_ENV || "development",
  path = require("path"),
  metaAttributes = require("./app/resources/meta-attributes.json"),
  webpack = require("webpack"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  config,
  loaders;

config = {
  devtool: "source-map",
  entry: [
    "./app/index.jsx"
  ],
  module: {
    loaders: [],
    noParse: /\.min\.js/
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].js",
    chunkFilename: "[chunkhash].js",
    sourceMapFilename: "debugging/[file].map",
    hotUpdateChunkFilename: "hot/[id].[hash].hot-update.js",
    hotUpdateMainFilename: "hot/[hash].hot-update.json"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "app/index.html",
      meta: metaAttributes
    })
  ],
  remarkable: {
    html: true,
    preset: "full",
    linkify: true,
    typographer: true
  },
  resolve: {
    modulesDirectories: ["assets", "node_modules"],
    extensions: ["", ".js", ".jsx", ".json"]
  }
}

config.module.loaders.push(
  {test: /\.png$/,  loader: "url-loader?prefix=img/&limit=8192"},
  {test: /\.html$/,  loader: "html-loader"},
  {test: /\.svg$/,  loader: "url-loader?mimetype=image/svg+xml"},
  {test: /\.jpg$/,  loader: "url-loader?prefix=img/&limit=8192"},
  {test: /\.gif$/,  loader: "url-loader?prefix=img/&limit=8192"},
  {test: /\.woff$/, loader: "url-loader?prefix=font/&limit=8192"},
  {test: /\.eot$/,  loader: "file-loader?prefix=font/"},
  {test: /\.ttf$/,  loader: "file-loader?prefix=font/"},
  {test: /\.md$/,   loader: "html!remarkable"},
  {test: /\.styl$/, loader: "style-loader!css-loader!autoprefixer!stylus-loader?paths=node_modules/"},
  {test: /\.json$/, loader: "json-loader", exclude: [/node_modules/]},
  {test: /\.js$/,   loader: "babel-loader?optional=runtime", exclude: [/node_modules/]}
)

var JSXconfig = {test: /\.jsx$/,  loaders: ["babel-loader?optional=runtime"], exclude: [/node_modules/]}

if (ENVIRONMENT === "development") {
  config.cache = true
  config.debug = true
  config.devtool = "eval"

  config.entry.push(
    "webpack-dev-server/client?http://0.0.0.0:8080",
    "webpack/hot/only-dev-server"
  )

  config.devServer = {
    contentBase: "./dist/"
  }

  JSXconfig.loaders.push("react-hot")

  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  )
}

config.module.loaders.push(JSXconfig)

module.exports = config

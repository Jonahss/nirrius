var
  path = require("path"),
  metaAttributes = require("./app/resources/meta-attributes.json"),
  webpack = require("webpack"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  nib = require("nib"),
  loaders;

loaders = [
  {test: /\.png$/,  loader: "url-loader?prefix=img/&limit=8192"},
  {test: /\.svg$/,  loader: "url-loader?mimetype=image/svg+xml"},
  {test: /\.jpg$/,  loader: "url-loader?prefix=img/&limit=8192"},
  {test: /\.gif$/,  loader: "url-loader?prefix=img/&limit=8192"},
  {test: /\.woff$/, loader: "url-loader?prefix=font/&limit=8192"},
  {test: /\.eot$/,  loader: "file-loader?prefix=font/"},
  {test: /\.ttf$/,  loader: "file-loader?prefix=font/"},
  {test: /\.md$/,   loader: "html!remarkable"},
  {test: /\.styl$/, loader: "style-loader!css-loader!stylus-loader?paths=node_modules/"},
  {test: /\.json$/, loader: "json-loader", exclude: [/node_modules/]},
  {test: /\.js$/,   loader: "6to5-loader?experimental&optional=selfContained", exclude: [/node_modules/]},
  {test: /\.jsx$/,  loaders: ["6to5-loader?experimental&optional=selfContained", "react-hot", "jsx"], exclude: [/node_modules/]}
]

module.exports = {
  cache: true,
  debug: true,
  // devtool: "source-map",
  devtool: "eval",
  entry: [
    "./app/index.jsx",
    "webpack-dev-server/client?http://0.0.0.0:8080",
    "webpack/hot/only-dev-server"
  ],
  devServer: {
    contentBase: "./dist/"
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
module: {
  loaders: loaders,
    noParse: /\.min\.js/
  },
  remarkable: {
    html: true,
    preset: "full",
    linkify: true,
    typographer: true
  },
  stylus: {
    use: [nib()]
  },
  resolve: {
    modulesDirectories: ["assets", "node_modules"],
    extensions: ["", ".js", ".jsx", ".json"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "app/index.html",
      meta: metaAttributes
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      to5Runtime: "imports?global=>{}!exports?global.to5Runtime!6to5/runtime"
    })
  ]
}

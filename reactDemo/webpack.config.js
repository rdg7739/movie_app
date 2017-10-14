var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/client/public');
var APP_DIR = path.resolve(__dirname, 'src/client/app');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "src/client/style/[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development",
    allChunks: true
});

var config = {
  entry:
  {
    main: APP_DIR + '/app.jsx'
  },
  output: {
    path: BUILD_DIR,
    filename: '[name].js'
  },
  devServer: {
    publicPath: "/",
    contentBase: "./src/client",
    hot: true
  },
  devtool: 'source-map', 
  module : {
    rules: [
        {
          test: /\.(scss|sass)$/,
          loader: ExtractTextPlugin.extract('css-loader!sass-loader')
        },
        {
          test: /\.js[x]?$/,
          exclude: /(node_modules|bower_components)/,
          use: [{
              loader: "babel-loader"
          }]
        }
    ]
  },
  plugins: [
    new ExtractTextPlugin('../style/style.css', {
      allChunks: true
  })
  ]
};

module.exports = config;
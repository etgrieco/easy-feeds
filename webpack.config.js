const path = require('path');
const webpack = require("webpack");

const isProduction = process.env.NODE_ENV === 'production'
const devPlugins = [];
const prodPlugins = [];

const plugins = [
  ...(isProduction? devPlugins : prodPlugins)
];

module.exports = {
  context: __dirname,
  entry: "./frontend/easy_feeds.jsx",
  output: {
    path: path.resolve(__dirname, 'app', 'assets', 'javascripts'),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: [".js", '.jsx', '*']
  },
  plugins
};

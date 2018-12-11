var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'app');

var config = {
  entry: APP_DIR + '/index.jsx',

  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },

  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ['babel-loader']
    },
    {
      test: /\.css$/,
      use: ['style-loader','css-loader']
    }]
  },

  resolve: {
    extensions: ['*', '.js', '.jsx']
  },

  devServer: {
    historyApiFallback: true,
    inline: true,
    contentBase: './public',
    port: 8090
  }
};

module.exports = config;

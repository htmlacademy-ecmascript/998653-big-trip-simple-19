/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars, no-undef
const Webpack = require('webpack');
// eslint-disable-next-line no-unused-vars
const webpackDevServer = require('webpack-dev-server');
// eslint-disable-next-line no-undef
const path = require('path');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

// eslint-disable-next-line no-undef
module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    clean: true,
    filename: 'bundle.js',
  },
  experiments: {
    topLevelAwait: true,
  },
  devtool: 'source-map',
  devServer: {
    hot: true,
  },
  plugins: [
    new FileManagerPlugin({
      events: {
        onStart: {
          delete: ['build'],
        },
      },
    }),
    new CopyPlugin({
      patterns: [{ from: 'public', to: 'build' }],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};


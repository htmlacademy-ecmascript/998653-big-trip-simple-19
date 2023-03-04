const Webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const path = require('path');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

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


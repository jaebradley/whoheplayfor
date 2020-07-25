const { merge } = require('webpack-merge');

const base = require('./base');

module.exports = merge(base, {
  mode: 'development',
  output: {
    filename: '[name].[hash].js',
  },
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    compress: true,
    port: 2020,
    hot: true
  }
});

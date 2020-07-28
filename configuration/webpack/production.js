const { merge } = require('webpack-merge');

const base = require('./base');

module.exports = merge(base, {
  devtool: 'source-map',
  output: {
    filename: '[name].[chunkhash].js',
  },
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
});
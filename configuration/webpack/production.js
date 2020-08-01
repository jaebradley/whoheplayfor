const { merge } = require('webpack-merge');
const { EnvironmentPlugin } = require('webpack');

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
  },
  plugins: [
    new EnvironmentPlugin({
      NODE_ENV: 'development'
    }),
  ]
});

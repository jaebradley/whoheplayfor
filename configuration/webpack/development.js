const { merge } = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const { EnvironmentPlugin } = require('webpack');

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
  },
  plugins: [
    new EnvironmentPlugin({
      NODE_ENV: 'development',
      SEASON: '2019-20'
    }),
    new WebpackBuildNotifierPlugin({
      title: "Whoheplayfor Webpack Build",
    }),
    new BundleAnalyzerPlugin(),
  ]
});

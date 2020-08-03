const { merge } = require('webpack-merge');
const { EnvironmentPlugin } = require('webpack');

const base = require('./base');

module.exports = merge(base, {
  devtool: 'source-map',
  output: {
    filename: '[name].[hash].js',
  },
  mode: 'production',
  // https://medium.com/hackernoon/the-100-correct-way-to-split-your-chunks-with-webpack-f8a9df5b7758
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },
  },
  plugins: [
    new EnvironmentPlugin({
      NODE_ENV: 'production',
      SEASON: '2019-20'
    }),
  ],
  devServer: {
    compress: true,
    port: 3030,
    hot: true
  },
});

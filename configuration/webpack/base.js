const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { EnvironmentPlugin } = require('webpack');
const WorkboxPlugin = require('workbox-webpack-plugin');

const path = require('path');

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../../src/index.tsx')
  },
  output: {
    path: path.resolve(__dirname, '../../dist'),
    // https://github.com/webpack-contrib/worker-loader/issues/142
    globalObject: 'this'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Who He Play For?',
      template: path.resolve(__dirname, '../../src/index.html')
    }),
    new ForkTsCheckerWebpackPlugin(),
    new EnvironmentPlugin({
      PUBLIC_URL: 'http://localhost:2020'
    }),
    new WorkboxPlugin.InjectManifest({
      swSrc: path.resolve(__dirname, '../../src/serviceWorker.ts'),
      swDest: path.resolve(__dirname, '../../dist/serviceWorker.js'),
      maximumFileSizeToCacheInBytes: 10000000
    })
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js?x$/,
        exclude: /(node_modules)/,

        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
      '@App': path.resolve(__dirname, '../../src/App'),
      '@Src': path.resolve(__dirname, '../../src')
    },
  },
};

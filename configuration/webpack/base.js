const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { EnvironmentPlugin } = require('webpack');
const WorkboxPlugin = require('workbox-webpack-plugin');

const path = require('path');

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../../src/index.tsx'),
    serviceWorker: path.resolve(__dirname, '../../src/serviceWorker.ts')
  },
  output: {
    path: path.resolve(__dirname, '../../dist'),
    filename: '[name].js',
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
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      // Do not precache images
      exclude: [/\.(?:png|jpg|jpeg|svg)$/],

      // Define runtime caching rules.
      runtimeCaching: [{
        // Match any request that ends with .png, .jpg, .jpeg or .svg.
        urlPattern: /\.(?:png|jpg|jpeg|svg)$/,

        // Apply a cache-first strategy.
        handler: 'CacheFirst',

        options: {
          // Use a custom cache name.
          cacheName: 'images',

          // Only cache 100 images.
          expiration: {
            maxEntries: 100,
          },
        },
      }],
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

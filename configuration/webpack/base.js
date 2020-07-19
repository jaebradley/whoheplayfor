const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const path = require('path');

module.exports = {
  entry: ['react-hot-loader/patch', path.resolve(__dirname, '../../src/index.tsx')],
  output: {
    path: path.resolve(__dirname, '../../dist'),
    filename: 'app.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Who He Play For?',
      template: path.resolve(__dirname, '../../src/index.html')
    }),
    new ForkTsCheckerWebpackPlugin()
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
    },
  },
};

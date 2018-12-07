const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devtool: 'inline-source-map',
  entry: './app/index.tsx',
  mode: 'development',
  target: 'electron-main',
  watch: true,
  output: {
    filename: './bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@api': path.resolve(__dirname, 'app/api'),
      '@actions': path.resolve(__dirname, 'app/actions'),
      '@reducers': path.resolve(__dirname, 'app/reducers'),
      '@states': path.resolve(__dirname, 'app/states'),
      '@containers': path.resolve(__dirname, 'app/containers'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          { loader: 'ts-loader', options: { happyPackMode: true, transpileOnly: true } },
          { loader: 'source-map-loader' },
        ],
        exclude: /node_modules/,
      },
      { test: /\.js$/, loader: 'source-map-loader' },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          loader: 'css-loader',
          options: {
            minimize: false,
            modules: true,
          },
        }),
      },
      { test: /\.html$/, loader: 'html-loader' },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]?[hash]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './index.html',
      filename: './index.html',
    }),
    new CopyWebpackPlugin([{ from: './package.json', to: './' }, { from: './main.js', to: './' }]),
  ],
};

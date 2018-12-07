const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './app/index.tsx',
  mode: 'production',
  target: 'electron-renderer',
  watch: false,
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
  node: {
    __dirname: false,
    __filename: false,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [{ loader: 'ts-loader' }],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          loader: 'css-loader',
          options: {
            modules: true,
            minimize: true,
          },
        }),
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          minimize: true,
        },
      },
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
      options: {
        minify: true,
      },
    }),
    new CopyWebpackPlugin([{ from: './package.json', to: './' }]),
  ],
};

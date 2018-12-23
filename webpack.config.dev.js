const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');

module.exports = {
  entry: './app/index.tsx',
  mode: 'development',
  devtool: 'cheap-module-source-map',
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
      '@store': path.resolve(__dirname, 'app/store'),
      '@containers': path.resolve(__dirname, 'app/containers'),
      '@components': path.resolve(__dirname, 'app/components'),
      '@hoc': path.resolve(__dirname, 'app/HOC'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [{ loader: 'ts-loader', options: { happyPackMode: true, transpileOnly: true } }],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true,
            },
          },
          { loader: 'css-loader' },
        ],
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
    new WebpackShellPlugin({ onBuildEnd: ['npm run electron-run'] }),
  ],
};

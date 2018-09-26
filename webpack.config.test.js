'use strict';

const { resolve } = require('path');

module.exports = {
  devtool: 'inline-source-map',
  mode: 'development',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: [resolve(__dirname, 'app'), 'node_modules'],
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.tsx$/,
        loader: 'source-map-loader',
      },

      {
        test: /\.tsx$/,
        loader: 'ts-loader',
        query: {
          sourceMap: false,
          inlineSourceMap: true,
          compilerOptions: {
            removeComments: true,
          },
        },
      },
    ],
  },

  node: {
    global: true,
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false,
  },

  externals: {
    jsdom: 'window',
    'react/lib/ExecutionEnvironment': 'true',
    'react/addons': 'true',
    'react/lib/ReactContext': 'window',
  },
};

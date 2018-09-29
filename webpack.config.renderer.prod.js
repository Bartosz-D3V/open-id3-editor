const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './main.js',
  mode: 'production',
  target: 'electron-main',
  watch: false,
  output: {
    filename: './main.js',
  },
  resolve: {
    extensions: ['.js'],
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        test: 'main.js',
        cache: false,
        parallel: false,
        uglifyOptions: {
          mangle: true,
          keep_fnames: false,
          compress: true,
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
};

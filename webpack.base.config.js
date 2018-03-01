module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }, {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ],
  },
  resolve: {
    modules: [
      'node_modules',
      'lodash',
      'vue'
    ]
  },
  devtool: 'source-map',
  target: 'web'
};

var config = require('./webpack.base.config');

config.mode = 'production';
config.entry = './src/index.js';
config.output = {
  filename: 'bastidest-vue-json-tree-view.min.js',
  library: 'TreeView',
  libraryTarget: 'umd'
};

module.exports = config;

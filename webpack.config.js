'use strict';

let path = require('path');

module.exports = {
  mode: 'development',
  entry: './js/script.js',
  output: {
    filename: 'bundle.js',
    //как файл называетс
    path: __dirname + '/dist/js'
  },
  // тут мы конфигурируем тот файл что у нас получиться в итоге
  watch: true,

  devtool: "source-map",

  module: {}
};

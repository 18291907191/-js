const path = require('path');
module.exports = {
  mode: 'development',
  entry: {
    index: ['./src/plugins/message.js', './src/plugins/http.js', './src/api/home.js', './src/js/index.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  }
};

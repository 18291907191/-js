const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

module.exports = merge(baseConfig, {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    })
  ],
  devServer: {
    // 设置服务器访问的基本目录
    // contentBase: path.resolve(__dirname, 'bgwhite-js'),
    // 服务器ip地址，localhost
    host: 'localhost',
    port: 8090,
    open: true, // 自动打开浏览器
    hot: true // 热更新
  },
  devtool: 'cheap-module-eval-source-map'
});

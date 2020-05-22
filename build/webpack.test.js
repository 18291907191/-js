const merge = require('webpack-merge'); // 合并webpack配置
const baseConfig = require('./webpack.base.js');
const Webpack = require('webpack');

module.exports = merge(baseConfig, {
  mode: 'production',
  plugins: [
    new Webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
        API_ROOT: '"http://manage.bgwhite.cn/api"'
      }
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

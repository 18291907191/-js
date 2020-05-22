const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // js代码压缩优化
const merge = require('webpack-merge'); // 合并webpack配置
const baseConfig = require('./webpack.base.js');
const Webpack = require('webpack');

module.exports = merge(baseConfig, {
  mode: 'production',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: false,
        uglifyOptions: {
          compress: {
            warnings: false,
            drop_debugger: true,
            drop_console: true,
            pure_funcs: ['console.log'] // 移除console
          }
        }
      })
    ],
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
        API_ROOT: '"http://manage.bgwhite.cn/api"'
      }
    })
  ],
  devtool: 'cheap-module-source-map'
});

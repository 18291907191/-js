const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // js代码压缩优化
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

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
    ]
  },
  devtool: 'cheap-module-source-map'
});

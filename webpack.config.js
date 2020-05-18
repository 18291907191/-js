const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // html模板配置
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // dist打包文件清理
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // css样式抽离
const CopyWebpackPlugin = require('copy-webpack-plugin'); // 复制
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩css文件
const Webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    index: ['./src/plugins/message.js', './src/plugins/http.js', './src/api/home.js', './src/js/index.js'],
    detail: ['./src/plugins/message.js', './src/plugins/http.js', './src/api/detail.js', './src/js/detail.js', './src/plugins/articleNav.js']
  },
  output: {
    path: path.resolve(__dirname, 'bgwhite-js'),
    filename: 'js/[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components|static)/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.(woff|svg|eot|ttf)\??.*$/,
        loader: 'file-loader',
        query: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  devServer: {
    // 设置服务器访问的基本目录
    contentBase: path.resolve(__dirname, 'bgwhite-js'),
    // 服务器ip地址，localhost
    host: 'localhost',
    port: 8090,
    open: true, // 自动打开浏览器
    hot: true // 热更新
  },
  plugins: [
    new CleanWebpackPlugin(),
    new Webpack.HotModuleReplacementPlugin(), // 热更新
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      hash: true,
      inject: 'body',
      chunks: ['index'],
      minify: {
        removeComments: true,
        removeAttributeQuotes: true
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'detail.html',
      template: 'src/detail.html',
      hash: true,
      inject: 'body',
      chunks: ['detail'],
      minify: {
        removeComments: true,
        removeAttributeQuotes: true
      }
    }),
    new ExtractTextPlugin({
      filename: 'styles/[name].css'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, './src/static'),
          to: path.join(__dirname, '/bgwhite-js/static')
        }
      ]
    }),
    new OptimizeCSSAssetsPlugin({
      // 默认是全部的CSS都压缩，该字段可以指定某些要处理的文件
      assetNameRegExp: /\.(sa|sc|le|c)ss$/g,
      // 指定一个优化css的处理器，默认cssnano
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', {
          discardComments: { removeAll: true }, // 对注释的处理
          normalizeUnicode: false // 建议false,否则在使用unicode-range的时候会产生乱码
        }]
      },
      canPrint: true // 是否打印编译过程中的日志
    })
  ],
  externals: {
    axios: 'axios'
  }
};

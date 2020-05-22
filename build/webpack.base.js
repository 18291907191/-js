const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // html模板配置
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // dist打包文件清理
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // css样式抽离
const CopyWebpackPlugin = require('copy-webpack-plugin'); // 复制
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩css文件
const Webpack = require('webpack');

module.exports = {
  entry: {
    index: ['./src/plugins/message.js', './src/plugins/http.js', './src/api/home.js', './src/js/index.js', './src/plugins/animation.js'],
    detail: ['./src/plugins/message.js', './src/plugins/http.js', './src/api/detail.js', './src/js/detail.js', './src/plugins/backTop.js'],
    about: ['./src/js/about.js']
  },
  // 设置入口的文件大小限制
  performance: {
    hints: 'warning',
    maxEntrypointSize: 50000000,
    maxAssetSize: 30000000,
    assetFilter: function(assetFilename) {
      return assetFilename.endsWith('.js');
    }
  },
  output: {
    path: path.resolve(__dirname, '../bgwhite-js'),
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
        // npm i less-loader less -D
        test: /.\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
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
  plugins: [
    new CleanWebpackPlugin(),
    new Webpack.HotModuleReplacementPlugin(), // 热更新
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      hash: true,
      inject: 'body',
      chunks: ['index'],
      minify: {
        removeComments: true,
        removeAttributeQuotes: true,
        collapseWhitespace: true // 进行折叠去除空格
      }
    }),
    new HtmlWebpackPlugin({
      filename: '404.html',
      template: './src/404.html',
      hash: true,
      inject: 'body',
      chunks: [404],
      minify: {
        removeComments: true,
        removeAttributeQuotes: true,
        collapseWhitespace: true // 进行折叠去除空格
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'detail.html',
      template: './src/detail.html',
      hash: true,
      inject: 'body',
      chunks: ['detail'],
      minify: {
        removeComments: true,
        removeAttributeQuotes: true,
        collapseWhitespace: true // 进行折叠去除空格
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'about.html',
      template: './src/about.html',
      hash: true,
      inject: 'body',
      chunks: ['about'],
      minify: {
        removeComments: true,
        removeAttributeQuotes: true,
        collapseWhitespace: true, // 进行折叠去除空格
      }
    }),
    new ExtractTextPlugin({
      filename: 'styles/[name].css'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, '../src/static'),
          to: path.join(__dirname, '../bgwhite-js/static')
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

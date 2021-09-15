const path = require('path')

// 1. 导入插件，得到构造函数
const HtmlPlugin = require('html-webpack-plugin')
// 2. 创建插件的实例对象
const htmlPlugin = new HtmlPlugin({
  template: './src/index.html',
  filename: './index.html',
})

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 每次打包构建之前，会调用该插件先清理dist目录，确保生成得到最新的打包文件
const cleanPlugin = new CleanWebpackPlugin()

module.exports = {
  mode: 'development', // development  production
  // eval-source-map 仅限在开发模式下使用
  // 开发环境下，此选项生成的 Source Map 可保证运行时报错的行数与源代码的行数保持一致
  devtool: 'eval-source-map',
  // 生产环境下，建议关闭 SourceMap 或将 devtool 的值设置为 nosources-source-map
  // 在生产环境下，如果省略了 devtool 选项，最终生成的文件中不包含 Source Map，这能够防止原始代码通过 Source Map 的形式暴露给别有所图之人, 不利于调试排错
  // 在生产环境下，如果只想定位报错的具体行数，且不想暴露源码。此时可以将 devtool 的值设置为nosources-source-map
  // devtool: 'nosources-source-map',
  // 在生产环境下，如果想在定位报错行数的同时，展示具体报错的源码。此时可以将 devtool 的值设置为source-map
  // devtool: 'source-map',
  // 指定打包的入口（绝对路径）
  entry: path.join(__dirname, './src/index.js'),
  // 指定打包的出口
  output: {
    // 表示输出文件的存放路径
    path: path.join(__dirname, './dist'),
    // 表示输出文件的名称，执行打包会把 JavaScript 文件统一生成到 js 目录中
    filename: 'js/bundle.js',
  },
  plugins: [htmlPlugin, cleanPlugin], // 3. 挂载插件的实例对象
  devServer: {
    open: true,
    host: '127.0.0.1',
    port: 80,
  },
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
      // { test: /\.jpg|png|gif$/, use: 'url-loader?limit=22228' }
      {
        test: /\.jpg|png|gif$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 22228,
            // 执行build打包，会把图片文件统一生成到dist文件夹下的 image 目录中
            outputPath: 'image',
          },
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
    ],
  },
}

const path = require('path')
const UglifyPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
  publicPath: '/',
  // outputDir: '../uadp7.1/src/main/resources/static', // 运行build 时生成的构建文件的目录，默认'dist'
  outputDir: './dist', // 运行build 时生成的构建文件的目录，默认'dist'
  // assetsDir: 'assets', // build之后生成的静态资源放置的目录，默认''
  // indexPath: 'test/home.html', // build之后生成的index.html的路径
  productionSourceMap: false,
  configureWebpack: {
    externals: {
      // vue: 'Vue',
      // 'vue-router': 'VueRouter',
      // 'element-ui': 'ELEMENT',
    }
  },
  // es6 旧浏览器兼容
  chainWebpack: config => {
    config.entry('main').add('babel-polyfill')
  },
  // webpack配置
  chainWebpack: (config) => {
    // 别名配置
    config.resolve.alias
      .set('@', path.resolve(__dirname, './src'))
      .set('@a', path.resolve(__dirname, './src/assets'))
      .set('@c', path.resolve(__dirname, './src/components'))
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.mode = 'production'

      // 警告 webpack 的性能提示
      const performance = {
        hints: 'warning',
        // 入口起点的最大体积
        maxEntrypointSize: 800000,
        // 生成文件的最大体积
        maxAssetSize: 800000,
        // 只给出 js 文件的性能提示
        assetFilter: function (assetFilename) {
          return assetFilename.endsWith('.js')
        }
      }

      // console.log('VUE_APP_MODE', process.env.VUE_APP_MODE);

      // 设置生产去除打印信息console
      const compress = function () {
        return process.env.VUE_APP_MODE === 'production'
          ? [new UglifyPlugin({
            uglifyOptions: {
              warnings: false,
              parallel: 4,
              compress: {
                drop_console: true, // 把console.log()注释掉
                drop_debugger: false,
                pure_funcs: ['console.log'] // 移除console
              }
            }
          })] : []
      }

      // console.log('compress', compress());

      // 将每个依赖包打包成单独的js文件,优化打包chunk-vendors.js文件体积过大
      const optimization = {
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: Infinity,
          minSize: 30000, // 依赖包超过30000bit将被单独打包
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name (module) {
                // get the name. E.g. node_modules/packageName/not/this/part.js
                // or node_modules/packageName
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                // npm package names are URL-safe, but some servers don't like @ symbols
                return `npm.${packageName.replace('@', '')}`
              }
            }
          }
        },
        // 设置生产去除打印信息console
        minimizer: compress()
      }

      Object.assign(config, {
        performance,
        optimization
      })
    } else {
      // 为开发环境修改配置...
      config.mode = 'development'
      // 关闭性能提示
      const performance = {
        hints: false
      }
      Object.assign(config, {
        performance
      })
    }
  }
}

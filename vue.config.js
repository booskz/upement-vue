const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,

  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = '个人信息管理系统'
      return args
    }
    )
  },
  // set static folder as public path
  publicPath: './',
  // set output path
  outputDir: 'dist',
  // set assets public path
  assetsDir: 'static',

})

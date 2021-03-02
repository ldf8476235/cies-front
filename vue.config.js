/*
 * @Autor: wh
 * @Version: 1.0
 * @Date: 2020-11-30 17:12:31
 * @LastEditors: wh
 * @Description:
 * @LastEditTime: 2021-03-02 13:46:52
 */
module.exports = {
  publicPath: './',
  lintOnSave: false,
  productionSourceMap: false,
  chainWebpack: config => {
    // 清空默认svg规则
    config.module
      .rule('svg')
      .uses.clear()
    config.module // 针对svg文件添加svg-sprite-loader规则
      .rule('svg')
      .test(/\.svg$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
    // config.module
    //     .rule('eslint')
    //     .use('eslint-loader')
    //     .loader('eslint-loader')
    //     .tap(options => {
    //         console.log(options)
    //         options.fix = true
    //         return options
    //     })
  },
  devServer: {
    proxy: {
      '/api': { // 代理api
        target: 'http://192.168.210.130:5000/api/', // 'http://localhost:17310/api/', // 服务器api地址 http://192.168.210.130:8000/api/
        changeOrigin: true, // 是否跨域
        ws: true, // proxy websockets
        // port: 17310,
        pathRewrite: { // 重写路径
          '^/api': ''
        }
      }
    }

  }
}

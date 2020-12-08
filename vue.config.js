/*
 * @Autor: wh
 * @Version: 1.0
 * @Date: 2020-11-30 17:12:31
 * @LastEditors: wh
 * @Description: 
 * @LastEditTime: 2020-12-08 18:39:14
 */
module.exports = {
    publicPath: './',
    lintOnSave: false,
    chainWebpack: config => {
        // 清空默认svg规则
        config.module
            .rule('svg')
            .uses.clear()
        config.module //针对svg文件添加svg-sprite-loader规则
            .rule('svg')
            .test(/\.svg$/)
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
            symbolId: 'icon-[name]'
            })
            .end()
    },
    devServer:{
        proxy: {
            '/api': {//代理api
                target: "http://localhost:17310/api/",//服务器api地址
                changeOrigin: true,//是否跨域
                ws: true, // proxy websockets
                pathRewrite: {//重写路径
                    "^/api": ''
                }
            }
        }

    }
}
/*
 * @Autor: wh
 * @Version: 1.0
 * @Date: 2020-11-30 17:12:31
 * @LastEditors: wh
 * @Description: 
 * @LastEditTime: 2020-12-04 14:12:22
 */
module.exports = {
    publicPath: './',
    lintOnSave: false,
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
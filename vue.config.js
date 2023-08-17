module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    /*proxyTable: {
        "/api":{
            target:"http://localhost:8081/",
            changeOrigin:true,
            pathRewrite:{
                "^/api" : "/bank"
            }
        }
    }*/
    // devServer: {
    //     proxy: {
    //         '/api':{
    //             target:'http://jsonplaceholder.typicode.com',
    //             changeOrigin:true,
    //             pathRewrite:{
    //                 '/api':''
    //             }
    //         }
    //     }
    // }
}

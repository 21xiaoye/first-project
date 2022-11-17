module.exports = {
  lintOnSave: false,//关闭语法检测
  devServer: {
    open: true,
    host:'0.0.0.0',
      proxy: {
        '^/': {
          target: 'http://127.0.0.1',
          changeOrigin: true,
        },
        // '^/': {
        //   target: 'http://members.3322.org/dyndns/getip',
        //   changeOrigin: true,
        //   ws:true
        // }
      },
    },
  }
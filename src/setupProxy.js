const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(createProxyMiddleware(process.env.REACT_APP_API, {
    target: process.env.REACT_APP_BASE_URL, //配置你要请求的服务器地址
    changeOrigin: true,
    pathRewrite: {  //重写
      [`^${process.env.REACT_APP_API}`]: "",
    },
  }))

  // http://localhost:3000/devApi/login/
  /**
   * http://localhost:3000  ---URL地址   
   * /devApi   ---拦截器里边的api
   * 1.匹配到/devApi,开始做代理  http://old.web-jshtml.cn/api/react
   * 2./devApi/login/ =重写=> /login/  
   * 3.替换之后的地址:   http://old.web-jshtml.cn/api/react/login/
   */
};
const Koa = require('koa');
const app = new Koa();
const path = require('path');
const router = require('./routes');
const bodyParser = require('koa-bodyparser');
const convert = require('koa-convert');
const koaLogger = require('koa-logger');
const static = require('koa-static');
const cors = require('koa2-cors');
const wss = require('./socket');
app.use(cors()); // 设置跨域
app.use(bodyParser())

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './files';
app.use(static(
    path.join( __dirname,  staticPath)
))

// 配置控制台日志中间件
app.use(convert(koaLogger()));

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())

// 没有的路由地址 返回错误信息
app.use(async (ctx, next) => {
    ctx.body = '非法访问';
})
app.listen(2333, () => {
    console.log('server start at localhost:2333')
})

module.exports = app;

//捕获node异常  不允许退出
process.on('uncaughtException', function (err) {
    console.log("api异常退出被捕获了");
    console.error(err.stack);
    console.log("Node NOT Exiting...");
});
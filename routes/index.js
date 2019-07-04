const Router = new require('koa-router');

// 装载所有子路由
let router = new Router()
const demoRouter = require('./demo.routes');

router
    .use('/demo', demoRouter.routes(), demoRouter.allowedMethods());

module.exports = router;
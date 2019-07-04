const router = new require('koa-router')();
const demo = require('../controller/demo');
router
    .get('/getDemo', async (ctx) => {
        const result = await demo.getDemo(ctx);
        ctx.body = result;
    })
    .post('/postDemo', async (ctx) => {
        const result = await demo.postDemo(ctx);
        ctx.body = result;
    })
    .post('/getUserList', async (ctx) => {
        const result = await demo.getUserList(ctx);
        ctx.body = result;
    })
    .post('/addUser', async (ctx) => {
        const result = await demo.addUser(ctx);
        ctx.body = result;
    })
    .post('/updateUser', async (ctx) => {
        const result = await demo.updateUser(ctx);
        ctx.body = result;
    })
    .post('/deleteUser', async (ctx) => {
        const result = await demo.deleteUser(ctx);
        ctx.body = result;
    })

module.exports = router;
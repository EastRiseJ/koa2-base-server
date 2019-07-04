const { util, db, myJwt } = require('../../util');
const { query } = db;

const demo = {
    /**
     * get 请求demo
     * @param ctx
     * @return {Promise<*|{code: (*), pageIndex: *, pageSize: *, total: *, data: (*), msg: (*)}>}
     */
    async getDemo (ctx) {
        return util.sendData([], 'get success!');
    },
    /**
     * post 请求demo
     * @param ctx
     * @return {Promise<*|{code: (*), pageIndex: *, pageSize: *, total: *, data: (*), msg: (*)}>}
     */
    async postDemo (ctx) {
        return util.sendData([], 'post success!');
    },
    /**
     * 分页获取用户列表
     * @param ctx {
                    "pageIndex": 1,
                    "pageSize": 10
                }
     * @return {Promise<*|{code: (*), pageIndex: *, pageSize: *, total: *, data: (*), msg: (*)}>}
     */
    async getUserList (ctx) {
        const body = ctx.request.body;
        const { pageIndex, pageSize } = body;
        const sSql = 'SELECT id,userName,nickName,description,createTime,modifiedTime,roles,active FROM user limit ?,?;';
        const userlist = await query(sSql, [(pageIndex - 1) * pageSize, pageSize]);
        const total = (await query('select count(*) from user;'))[0]["count(*)"];
        return util.sendData(userlist, '查询成功!', pageIndex, pageSize, total);
    },

    /**
     * 添加用户
     * @param ctx
     * @return {Promise<*|{code: (*), pageIndex: *, pageSize: *, total: *, data: (*), msg: (*)}>}
     */
    async addUser (ctx) {
        const body = ctx.request.body;
        body.active = body.active || 0;
        const iSql = 'insert into user set ?';
        const result = await query(iSql, body).catch(err => {
            console.log(err);
            return util.sendErrorData('插入失败');
        });;
        return util.sendData('', '插入成功!');
    },

    /**
     * 修改用户
     * @param ctx
     * @return {Promise<*|{code: (*), pageIndex: *, pageSize: *, total: *, data: (*), msg: (*)}>}
     */
    async updateUser (ctx) {
        const body = ctx.request.body;
        const upSql = 'UPDATE user set ? where id = ?';
        try {
            const result = await query(upSql, [body, body.id]);
            return util.sendData(body, '修改成功!')
        } catch (e) {
            return util.sendErrorData('修改失败');
        }
        console.log(result);
    },

    /**
     * 删除用户
     * @param ctx
     * @return {Promise<*|{code: (*), pageIndex: *, pageSize: *, total: *, data: (*), msg: (*)}>}
     */
    async deleteUser (ctx) {
        const body = ctx.request.body;
        const deSql = 'delete from user where id = ?';
        try {
            const result = await query(deSql, [body.id]).catch(err => {
                console.log(err);
            });
            return util.sendData('', '删除成功!');
        } catch (e) {
            return util.sendErrorData('删除失败');
        }
    }
};
module.exports = demo;

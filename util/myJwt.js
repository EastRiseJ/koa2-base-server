const jwt = require('jwt-simple');
const secret = 'mydemo'
const myJwt = {
    /**
     * 设置token
     * @param data
     * @return {string}
     */
    setToken (data) {
        const date = Date.now();
        // 添加过期时间
        data.expire = 1000 * 60 * 60 * 8;
        const token = jwt.encode(data, secret + date) + date;
        return token;
    },

    /**
     * 根据token来获取数据
     * @param tokenStr
     * @return {*} 0: token过期
     */
    getDataByToken (tokenStr) {
        try {
            const nowDate = Date.now();
            const token = tokenStr.substring(0, tokenStr.length - 13);
            const date = tokenStr.substring(tokenStr.length - 13, tokenStr.length);
            const data = jwt.decode(token, secret + date);
            if (nowDate - date > data.expire ) {
                return 0;
            }
            delete data.expire;
            return data;
        } catch (e) {
            console.log(e);
            return null;
        }
    },

    /**
     * 根据ctx来获取数据
     * @param ctx
     * @return {*} 0: token过期
     */
    getDataByCtx (ctx) {
        const req = ctx.request;
        const headers = req.headers;
        const { authorization } = headers;
        return this.getDataByToken(authorization);
    }
};

module.exports = myJwt;
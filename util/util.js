const fs = require('fs');
const path = require('path');

const util = {
    /**
     * 发送成功返回的信息格式
     * @param data
     * @param msg
     * @param pageIndex
     * @param pageSize
     * @param total
     * @param code
     * @return {{code: (*|number), pageIndex: *, pageSize: *, total: *, data: (*|null), msg: (*|string)}}
     */
    sendData: (data, msg, pageIndex, pageSize, total, code) => {
        return {
            code: code || 0,
            pageIndex,
            pageSize,
            total,
            data: data || null,
            msg: msg || ''
        }
    },

    /**
     * 发送错误返回的信息格式
     * @param msg
     * @param data
     * @param code
     * @return {{code: (*|number), data: (*|null), msg: (*|string)}}
     */
    sendErrorData: (msg, data, code ) => {
        return {
            code: code || 1,
            data: data || null,
            msg: msg || ''
        }
    },
    /**
     * 根据路径获取文件名
     * @param mypath
     * @return {Array}
     */
    getFilenamesForPath (mypath = './files') {
        const items = fs.readdirSync(mypath);
        let result = [];

        // 遍历当前目录中所有的文件和文件夹

        items.map(item => {
            // return !fs.statSync(item).isDirectory();
            let temp = path.join(mypath, item);

            // 若当前的为文件夹

            if( fs.statSync(temp).isDirectory() ){
                // result.push( item ); // 存储当前文件夹的名字
                // 进入下一级文件夹访问
                // result = result.concat( getAllDirs( temp ) );
            } else {
                result.push( item ); // 存储当前文件夹的名字
            }

        });

        return result;
    },

    /**
     * 睡眠
     * @param timeStamp
     * @return {Promise<any>}
     */
    sleep (timeStamp) {
        return new Promise((resolve, reject)=> {
            setTimeout(resolve, timeStamp);
        })
    }
};

module.exports = util;
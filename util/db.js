const db = require('mysql');
const config = require('../config');
const pool = db.createPool(config.mysqlConf);

/**
 * 基础语句
 * @param sql
 * @param values
 * @return {Promise<any>}
 */
const query = function( sql, values ) {
    return new Promise(( resolve, reject ) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject( err )
            } else {
                connection.query(sql, values, ( err, rows) => {

                    if ( err ) {
                        reject( err )
                    } else {
                        resolve( rows )
                    }
                    connection.release()
                })
            }
        })
    })
};


module.exports = {
    query
};
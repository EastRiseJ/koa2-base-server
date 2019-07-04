const request = require('request');
function myRequest (option) {
    return new Promise((resolve, reject) => {
        request(option, ((err, response, body) => {
            if (err) {
                reject(err);
            } else {
                resolve(body);
            }
        }))
    })
}
module.exports = myRequest;
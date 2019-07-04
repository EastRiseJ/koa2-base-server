const WebSocket = require('ws');
const wss = new WebSocket.Server({
    port: 8888,
    perMessageDeflate: {
        zlibInflateOptions: {
            chunkSize: 10 * 1024
        },
        // Other options settable:
        clientNoContextTakeover: true, // Defaults to negotiated value.
        serverNoContextTakeover: true, // Defaults to negotiated value.
        clientMaxWindowBits: 10,       // Defaults to negotiated value.
        serverMaxWindowBits: 10,       // Defaults to negotiated value.
        // Below options specified as default values.
        concurrencyLimit: 10,          // Limits zlib concurrency for perf.
        threshold: 1024,               // Size (in bytes) below which messages
                                       // should not be compressed.
    }
});

let count = 0;  //目前正在连接服务器的数量
console.log("websocket服务器开启了,端口8888");

wss.on('connection', function (ws) {
    count++;
    wss.broadcastCount();
    ws.on('message', function (message) {
        console.log('received: %s', message);
        wss.broadcast(message);
    });

    ws.on('close', function () {
        count--;
        wss.broadcastCount();
    });
    ws.on('error', function() {
        count--;
        wss.broadcastCount();
    });
});

//广播count
wss.broadcastCount = () => {
    console.log(`当前在线人数: ${count}`);
    wsBroadcast({
        type: 'connectCount',
        count: count
    })
};

let infoList = [];

// 广播
wss.broadcast = (data) => {
    setTimeout(function() {
        wsBroadcast({
            type: 'msg',
            data: JSON.parse(data)
        })
    }, 0);
};

/**
 * 服务端ws发送消息
 */
function wsBroadcast(data) {
    let data2Str = toStr(data);
    wss.clients.forEach(function (client) {
        try {
            client.send(data2Str);
        } catch (err) {
            // console.log(err);
        }
    });
}

/**
 * 转成字符串
 * @param obj
 * @return {string}
 */
function toStr(obj) {
    return JSON.stringify(obj);
}

module.exports = wss;
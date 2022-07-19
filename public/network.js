const WebSocket = require("ws")
const http = require('http')
const fs = require("fs");

const port = 3010;
const server = http.createServer();
const wss = new WebSocket.Server({server});
wss.binaryType = "arraybuffer";
let users = [];


function Network() {
    wss.on('connection', function (w) {
        users.push(w);
        w.on('close', function () {
            const index = users.indexOf(w)
            users.splice(index, 1)
            console.log("Closed")
        })
        w.on("message", message => {
            console.log(message.toJSON().data)
            console.log(message.toString())
            for (let user of users) {
                    if (user !== w) {
                        user.send(message.toString());
                    }
            }
        });
    })
    server.listen(port, () => {
        console.log(`Data stream server started on port ${port}`);
    });
}

module.exports = Network
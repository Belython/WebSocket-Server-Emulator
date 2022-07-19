import {Middleware} from 'redux'
import {closeSocket, openSocket, writeMessage} from "../store/actionCreators";

const socketMiddleware: Middleware = store => {
    return next => {
        let socket: WebSocket;
        let url = localStorage.getItem('url')
        console.log(url)
        socket = new WebSocket('ws://localhost:3010')
        socket.binaryType = 'blob'
        socket.onopen = function (event) {
            console.log('Ws connect')
            store.dispatch(openSocket(socket.url));
        }
        socket.onclose = function (event) {
            console.log("Ws closed")
            store.dispatch(closeSocket(event.code));
        }
        socket.onerror = function (error) {
            console.log("Ws error")
            // store.dispatch(writeError(error.))
        };
        socket.onmessage = function (event) {
            if(store.getState().messages.isReadyToRecord) {
                store.dispatch(writeMessage(event.data, Date.now()));
            }
        };
        return action => {
            const messages = action.messages
            if (action.type === "Send") {
                if (store.getState().messages.wsConnected) {
                    for (let message of messages) {
                        socket.send(message.info)
                    }
                }
            }
            let result = next(action)
            return result;
        };
    }
}

export default socketMiddleware;
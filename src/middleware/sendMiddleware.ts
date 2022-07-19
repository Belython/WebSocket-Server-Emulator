import {sendMessage, stopMessage} from "../store/actionCreators";
import {IMessage, MessageState} from "../type";
import {Dispatch, Middleware, MiddlewareAPI} from "redux";


type INDEX_TYPE = number;
type DELTA_TIME_TYPE = number;
type STEP_TYPE = number;
type LAST_TIME_TYPE = number;
const sendMessageMiddleware: Middleware = (store: MiddlewareAPI<Dispatch, { messages: MessageState }>) => {
    let differenceTime: number;
    return next => {
        let timeout: number | NodeJS.Timeout;
        let step = 0;
        let delta: number = 0;
        let timeToSendFirsMessage = 0, timeToSendCurrentMessage;
        let preLastIndex = 0;

        function getMessagesToSend(messages: IMessage[], index: number, lastTime: number): [INDEX_TYPE, DELTA_TIME_TYPE, IMessage[], STEP_TYPE, LAST_TIME_TYPE] {
            step++;
            let messageToSend: IMessage[] = [];
            let i = index
            let lastedIndex: number = index;
            if (i < messages.length) {
                for (i; i < messages.length; i++) {
                    if ((messages[i].time - messages[index].time) < 1) {
                        messageToSend.push(messages[i])
                    } else {
                        differenceTime = messages[i].time - messages[index].time - delta
                        lastedIndex = i
                        lastTime = messages[lastedIndex - 1].time
                        return [lastedIndex, differenceTime, messageToSend, step, lastTime];
                    }
                }
                lastedIndex = i
            } else {
                store.dispatch(stopMessage(0, 0, 0));
            }
            return [lastedIndex, differenceTime, messageToSend, step, lastTime]
        }

        function getAllMessagesToSend(messages: IMessage[], time: number, index: number, lastTime: number): [INDEX_TYPE, IMessage[], LAST_TIME_TYPE] {
            let messageToSends: IMessage[] = [];
            let i = index
            let lastedIndex: number = index;
            if (i < messages.length) {
                for (i; i < messages.length; i++) {
                    if (messages[i].time <= time) {
                        messageToSends.push(messages[i])
                    } else {
                        lastedIndex = i
                        lastTime = messages[lastedIndex - 1].time
                        return [lastedIndex, messageToSends, lastTime];
                    }
                }
                lastedIndex = i;
            } else {
                store.dispatch(stopMessage(0, 0, 0));
            }
            return [lastedIndex, messageToSends, lastTime];
        }


        function sendPortion(time: number = -1) {
            let messagesToSend: IMessage[] = [];
            let lastIndex = store.getState().messages.lastIndex;
            let iMessages = store.getState().messages.messages;
            let lastTimeSend = store.getState().messages.lastTimeSend;
            if(lastIndex === 0){
                preLastIndex = 0;
            }
            if (time !== -1) {
                const response = getAllMessagesToSend(iMessages, time, lastIndex, lastTimeSend);
                [lastIndex, messagesToSend, lastTimeSend] = response
                differenceTime = 0;
                timeToSendCurrentMessage = Date.now()
                store.dispatch(sendMessage(messagesToSend, lastIndex, lastTimeSend, timeToSendCurrentMessage));
                preLastIndex = lastIndex
            } else {
                if (step === 0) {
                    timeToSendFirsMessage = Date.now()
                }
                timeToSendCurrentMessage = Date.now()
                if (lastIndex < iMessages.length) {
                    delta = (timeToSendCurrentMessage - timeToSendFirsMessage) - ((iMessages[lastIndex].time - iMessages[preLastIndex].time))
                }
                let response = getMessagesToSend(iMessages, lastIndex, lastTimeSend);
                [lastIndex, differenceTime, messagesToSend, step, lastTimeSend] = response
                store.dispatch(sendMessage(messagesToSend, lastIndex, lastTimeSend, timeToSendCurrentMessage));
                timeout = setTimeout(sendPortion, differenceTime);
            }
        }


        return action => {
            let result = next(action)
            if (action.type === "SendAllMessage") {
                sendPortion(action.time)
            }
            if (action.type === "Play") {
                sendPortion();
            }
            if (action.type === "Pause" || action.type === "Stop") {
                clearInterval(timeout);
                return result;
            }
            return result;
        };
    }
}

export default sendMessageMiddleware;
import {IMessage, MessageAction, MessageState} from "../type";


const reducer = (
    state: MessageState = {
        state: "inactive",
        messages: [],
        url: "",
        code: -1,
        wsConnected: false,
        lastIndex: 0,
        lastTimeSend: 0,
        differnseTime: 0,
        isReadyToRecord: false
    },
    action: MessageAction
): MessageState => {
    switch (action.type) {
        case "Inactive":
            console.log('inactive state')
            return {...state, state: "inactive"}
        case "Error":
            console.log('error state')
            return {...state, state: "error"}
        case "Close":
            console.log('close state')
            return {...state, state: "closed", code: action.code}
        case "Open":
            console.log('open state')
            localStorage.setItem('url', action.url)
            return {...state, state: "connected", url: action.url, wsConnected: true}
        case "Write":
            console.log('write state')
            console.log(action.message);
            const newMessage: IMessage = {
                info: action.message,
                time: action.time
            }
            return {
                ...state,
                messages: [...state.messages, newMessage]
            }
        case "GetReadyToRecord":
            return {...state, state: "getreadytorecord", isReadyToRecord: action.isReady}
        case "Set":
            return {
                ...state,
                lastIndex: action.lastIndex,
                lastTimeSend: action.lasTime,
                differnseTime: action.differenseTime,
                messages: action.messages
            }
        case "Play":
            console.log('play state')
            return {...state, state: "play"}
        case "Pause":
            console.log('pause state')
            return {...state, state: "pause"}
        case "Stop":
            console.log('stop state')
            return {
                ...state, state: "stop", lastIndex: action.lastIndex,
                lastTimeSend: action.lasTime,
                differnseTime: action.differenseTime,
            }
        case "Send":
            return {
                ...state,
                lastIndex: action.lastIndex,
                lastTimeSend: action.lasTime,
                differnseTime: action.differenseTime
            }
        case "SendAllMessage":
            return {
                ...state,
                lastTimeSend: action.time
            }
        default:
            return state
    }
}

export default reducer
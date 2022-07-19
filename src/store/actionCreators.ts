import * as actionTypes from "./actionTypes"
import {
    CloseMessageAction,
    ErrorMessageAction, GetReadyToRecord,
    IMessage,
    InactiveMessageAction,
    NewMessageAction,
    OpenMessageAction,
    PauseMessageAction,
    PlayMessageAction,
    SendAllMessage,
    SendMessageAction,
    SetMessageAction,
    StopMessageAction
} from "../type";


export function writeMessage(message: any, time: number): NewMessageAction {
    return {
        type: actionTypes.WRITE,
        message,
        time,
    }
}

export function setMessage(messages: IMessage[], lastIndex: number, lasTime: number, differenseTime: number): SetMessageAction {
    return {
        type: actionTypes.SET,
        messages: messages,
        lastIndex: lastIndex,
        lasTime: lasTime,
        differenseTime: differenseTime
    }
}

export function inactiveMessage(): InactiveMessageAction {
    return {
        type: actionTypes.INACTIVE,
    }
}

export function writeError(): ErrorMessageAction {
    return {
        type: actionTypes.ERROR,
    }
}

export function closeSocket(code: number): CloseMessageAction {
    return {
        type: actionTypes.CLOSE,
        code
    }
}

export function openSocket(url: string): OpenMessageAction {
    return {
        type: actionTypes.OPEN,
        url
    }
}

export function sendMessage(messages: IMessage[], index: number, time: number, differenceTime: number): SendMessageAction {
    return {
        type: actionTypes.SEND,
        messages: messages,
        lastIndex: index,
        lasTime: time,
        differenseTime: differenceTime,
    }
}

export function playMessage(): PlayMessageAction {
    return {
        type: actionTypes.PLAY,
    }
}

export function pauseMessage(): PauseMessageAction {
    return {
        type: actionTypes.PAUSE,
    }
}

export function stopMessage(lastIndex: number, lasTime: number, differenseTime: number): StopMessageAction {
    return {
        type: actionTypes.STOP,
        lastIndex: lastIndex,
        lasTime: lasTime,
        differenseTime: differenseTime
    }
}

export function sendAllMessage(time: number): SendAllMessage{
    return{
        type: actionTypes.SENDALLMESSAGE,
        time: time,
    }
}

export function  getReadyToRecord(isReady: boolean): GetReadyToRecord {
    return{
        type: actionTypes.GETREADYTORECORD,
        isReady: isReady
    }
}
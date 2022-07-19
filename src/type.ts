
export interface IMessage {
    time: number
    info: Object
}

export type MessageState = {
    messages: IMessage[];
    state: string;
    code: number;
    url: string;
    wsConnected: boolean;
    lastIndex: number;
    lastTimeSend: number;
    differnseTime: number;
    isReadyToRecord: boolean;
}

export type NewMessageAction = {
    type: "Write"
    message: any
    time: number
}

export type SetMessageAction = {
    type: "Set",
    messages: IMessage[];
    lastIndex: number;
    lasTime: number;
    differenseTime: number;
}

export type InactiveMessageAction = {
    type: "Inactive"
}

export type ErrorMessageAction = {
    type: "Error"
}

export type CloseMessageAction = {
    type: "Close"
    code: number
}

export type OpenMessageAction = {
    type: "Open"
    url: string
}

export type SendMessageAction = {
    type: "Send"
    messages: IMessage[]
    lastIndex: number
    lasTime: number
    differenseTime: number
}

export type PauseMessageAction = {
    type: "Pause"
}

export type PlayMessageAction = {
    type: "Play"
}

export type StopMessageAction = {
    type: "Stop"
    lastIndex: number;
    lasTime: number;
    differenseTime: number;
}

export type SendAllMessage = {
    type: "SendAllMessage"
    time: number
}

export type GetReadyToRecord = {
    type: "GetReadyToRecord"
    isReady: boolean
}



export type MessageAction = GetReadyToRecord | SendAllMessage | NewMessageAction | InactiveMessageAction | ErrorMessageAction | CloseMessageAction | OpenMessageAction | SetMessageAction | PauseMessageAction | PlayMessageAction | StopMessageAction | SendMessageAction;

export type DispatchType = (args: MessageAction) => MessageAction
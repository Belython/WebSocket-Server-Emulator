import {useSelector} from "react-redux";
import {IMessage, MessageState} from "../../../type";
import {Button} from "@mui/material";
import NavLinkItem from "../../menu/navlinkitem/navLinkItem";
import * as React from "react";
import {useCallback} from "react";

const buttonStyle = {
    textDecoration: "none",
    color: "white",
}

type Props = {
    messagesPerPage: number
    onClick?(message: IMessage): void
    selected?: boolean
}


export const ButtonLastSendMessage: React.FC<Props> = ({
                                                        messagesPerPage,
                                                        onClick,
                                                        selected
                                                    }) => {

    const lastIndex = useSelector(
        (state: { messages: MessageState }) => {
            return state.messages.lastIndex;
        })

    const messages = useSelector(
        (state: { messages: MessageState }) => {
            return state.messages.messages;
        }
    )

    const handleListItemClick = useCallback(() => {
        if (onClick) {
            onClick(messages[lastIndex - 1])
        }
    }, [onClick, lastIndex]);

    if (lastIndex === 0) {
        return (<Button disabled variant="contained" sx={{alignSelf: "center", margin: "1em"}}>
            <NavLinkItem style={buttonStyle}
                         path={`/read/${lastIndex - 1}?page=${Math.ceil(lastIndex / messagesPerPage)}`}
                         children={"К последнему отправленному сообщению"}/>
        </Button>);
    } else {
        return (<Button variant="contained" sx={{alignSelf: "center", margin: "1em"}} onClick={handleListItemClick}>
            <NavLinkItem style={buttonStyle}
                         path={`/read/${lastIndex - 1}?page=${Math.ceil(lastIndex / messagesPerPage)}`}
                         children={"К последнему отправленному сообщению"}/>
        </Button>);
    }
}
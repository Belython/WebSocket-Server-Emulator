import * as React from 'react';
import Box from '@mui/material/Box';
import {IMessage, MessageState} from "../../type";
import {useSelector} from "react-redux";
import {Button, List} from "@mui/material";
import BasicPagination from "./pagination/pagination";
import {useLocation} from "react-router-dom";
import {useCallback, useLayoutEffect, useMemo, useRef, useState} from "react";
import Sliders from "./slider/slider";
import useResizeObserver from "use-resize-observer";
import {MessageListElement} from "./messagelistelement/messageListElement";
import NavLinkItem from "../menu/navlinkitem/navLinkItem";
import {ButtonLastSendMessage} from "./buttonLastSendMessage/buttonlastsendmessage";

const listStyle = {
    marginLeft: "0.5em",
    height: "82%"
}


export default function MessagesRead() {
    const messages = useSelector(
        (state: { messages: MessageState }) => {
            return state.messages.messages;
        }
    )

    const lastIndex = useSelector(
        (state: { messages: MessageState }) => {
            return state.messages.lastIndex;
        })

    const [messagesPerPage, setMessagesPerPage] = useState(0)
    const ref = useRef<any>();

    const {height} = useResizeObserver<any>({ref});

    useLayoutEffect(() => {
        if (ref.current) {
            const heightList = ref.current.offsetHeight;
            const countItem = Math.floor(heightList / 88);
            setMessagesPerPage(countItem);
        }
    }, [height]);

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get('page') || '1', 10);

    const lastMessageIndex = page * messagesPerPage
    const firstMessageIndex = lastMessageIndex - messagesPerPage

    const currentMessage = useMemo(() => messages.slice(firstMessageIndex, lastMessageIndex), [firstMessageIndex, lastMessageIndex, messages])

    const [selectedIndex, setSelectedIndex] = React.useState(-1);

    const handleListItemClick = useCallback((
        message: IMessage
    ) => {
        const index = messages.indexOf(message)
        setSelectedIndex(index);
    }, [messages]);



    if (messages.length > 0) {
        return (
            <Box sx={{display: "flex", flexDirection: 'column', height: "calc(100vh - 88px)"}}>
                <List ref={ref} style={listStyle}>
                    {currentMessage.map((message: IMessage, index: number) => (
                        <MessageListElement
                            message={message}
                            index={index}
                            messagesPerPage={messagesPerPage}
                            lastIndex={lastIndex}
                            action="read"
                            selected={selectedIndex === index + (page - 1) * messagesPerPage}
                            onClick={handleListItemClick}
                        />
                    ))}
                </List>
                <Box sx={{alignSelf: 'flex-end', width: "100%"}}>
                    <Box sx={{display: "flex", flexDirection: 'column'}}>
                        <BasicPagination
                            messagesPerPage={messagesPerPage}
                            totalPages={messages.length}
                            lastIndex={lastIndex}
                            action="read"
                        />
                        <ButtonLastSendMessage messagesPerPage={messagesPerPage} onClick={handleListItemClick}/>
                        <Sliders/>
                    </Box>
                </Box>
            </Box>

        );
    } else {
        return (null);
    }
}

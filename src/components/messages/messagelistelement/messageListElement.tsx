import * as React from 'react';
import {useLocation} from "react-router-dom";
import {ListItemButton, ListItemText, Typography} from "@mui/material";
import {IMessage} from "../../../type";
import {NavLinkItemLabel} from "../../menu/navlinkitem/navlinkitemlabel/navLinkItemLabel";
import NavLinkItem from "../../menu/navlinkitem/navLinkItem";
import {useCallback} from "react";
import SendAndArchiveIcon from '@mui/icons-material/SendAndArchive';
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';

type Props = {
    message: IMessage
    index: number
    messagesPerPage: number
    lastIndex: number
    action: string
    onClick?(message: IMessage): void
    selected?: boolean
}

const navLinkStyle = {
    textDecoration: "none",
    width: "100%",
    color: "black",
}


export const MessageListElement: React.FC<Props> = ({
                                                        message,
                                                        index,
                                                        messagesPerPage,
                                                        lastIndex,
                                                        action,
                                                        onClick,
                                                        selected
                                                    }) => {

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get('page') || '1', 10);

    let path = ''
    let id = index;

    if (page > 1) {
        path = `?page=${page}`
        id = index + messagesPerPage * (page - 1)
    }

    const date = new Date(message.time)

    const dateMessage = date.getHours().toString() + ":" + date.getMinutes().toString() + ":" + date.getSeconds().toString()
        + " " + date.getDate().toString() + "." + date.getMonth().toString() + "." + date.getFullYear().toString();

    const handleListItemClick = useCallback(() => {
        if (onClick) {
            onClick(message)
        }
    }, [onClick, message]);

    if (lastIndex > index + messagesPerPage * (page - 1) && action === "read") {
        return (
            <ListItemButton
                selected={selected}
                onClick={handleListItemClick}
            >
                <SendAndArchiveIcon/>
                <NavLinkItem children={<ListItemText primary={<NavLinkItemLabel
                    children={message.info.toString()}
                />} secondary={<Typography
                    sx={{
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                    }}
                >
                    {dateMessage}
                </Typography>}/>} path={`/${action}/${id}${path}`} style={navLinkStyle}/>
            </ListItemButton>);
    } else {
        return (
            <ListItemButton
                selected={selected}
                onClick={handleListItemClick}
            >
                <ScheduleSendIcon/>
                <NavLinkItem children={<ListItemText primary={<NavLinkItemLabel
                    children={message.info.toString()}
                />
                } secondary={<Typography
                >
                    {dateMessage}
                </Typography>}/>} path={`/${action}/${id}${path}`} style={navLinkStyle}/>
            </ListItemButton>
        );
    }
}
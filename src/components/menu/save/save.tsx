import * as React from 'react';
import {useSelector} from "react-redux";
import {MessageState} from "../../../type";
import {useMediaQuery} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import IconButtons from "../../iconbutton/iconButton";
import save from "save-file"

export default function Save() {

    const isTablet = useMediaQuery('(max-width:900px)');
    const isMobile = useMediaQuery('(max-width:425px');


    const messages = useSelector(
        (state: { messages: MessageState }) => {
            return state.messages.messages;
        }
    )

    const handleClickOpen = () => {
        save(JSON.stringify(messages), 'messages.json');
    };

    if (isTablet || isMobile) {
        return (
            <IconButtons onClick={handleClickOpen} icon={null} text={"Сохранить"} children={null}/>
        );
    } else {
        return (
            <IconButtons
                onClick={handleClickOpen}
                icon={<SaveIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 2}}/>}
                children={null}/>
        );
    }
}
import * as React from 'react';
import {
    MenuItem,
    Tooltip,
    useMediaQuery
} from "@mui/material";
import {useCallback} from "react";
import {useDispatch} from "react-redux";
import {setMessage} from "../../../store/actionCreators";
import UploadIcon from '@mui/icons-material/Upload';
import IconButtons from "../../iconbutton/iconButton";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";


export default function Help() {

    const isTablet = useMediaQuery('(max-width:900px)');
    const isMobile = useMediaQuery('(max-width:425px');

    if (isTablet || isMobile) {
        return (
            <Tooltip title="Для подключения использовать порт 3010">
                <MenuItem>
                    <IconButtons
                        text={"Справка"}/>
                </MenuItem>
            </Tooltip>

        );
    } else {
        return (
            <Tooltip title="Для подключения использовать порт 3010">
                <MenuItem>
                    <IconButtons
                        icon={<HelpCenterIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 2}}/>}
                        />
                </MenuItem>
            </Tooltip>
        );
    }
}
import * as React from 'react';
import {NavLink} from "react-router-dom";
import {Button} from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {getReadyToRecord, pauseMessage} from "../../../store/actionCreators";
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';


export default function Record() {
    const [isRecord, setIsRecord] = React.useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
        if (isRecord === true) {
            dispatch(getReadyToRecord(true))
        } else {
            dispatch(getReadyToRecord(false))
        }
    }, [isRecord])

    if(isRecord) {
        return (
            <Button variant="outlined" sx={{width: "50%", m:"auto"}} startIcon={<RadioButtonUncheckedIcon/>} onClick={() => {
                setIsRecord(!isRecord)
            }}>
                Остановить запись
            </Button>
        );
    } else{
        return (
            <Button variant="contained" sx={{width: "50%", m:"auto"}} startIcon={<RadioButtonCheckedIcon/>} onClick={() => {
                setIsRecord(!isRecord)
            }}>
                Начать запись
            </Button>
        );
    }
}
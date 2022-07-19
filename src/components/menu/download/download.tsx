import * as React from 'react';
import {
    useMediaQuery
} from "@mui/material";
import {useCallback} from "react";
import {useDispatch} from "react-redux";
import {setMessage} from "../../../store/actionCreators";
import UploadIcon from '@mui/icons-material/Upload';
import IconButtons from "../../iconbutton/iconButton";


export default function Download() {

    const isTablet = useMediaQuery('(max-width:900px)');
    const isMobile = useMediaQuery('(max-width:425px');

    const dispatch = useDispatch()


    const handleFileChosen = useCallback((file: any) => {
        const fileReader = new FileReader();
        fileReader.readAsText(file.target.files?.[0]);
        fileReader.onloadend = function () {
            const content = fileReader.result;
            if (typeof content === "string") {
                if (JSON.parse(content).length !== undefined) {
                    let isCorrect = true;
                    for (let i = 0; i < JSON.parse(content).length; i++) {
                        if (!(JSON.parse(content)[i].hasOwnProperty("info") && JSON.parse(content)[i].hasOwnProperty("time"))) {
                            isCorrect = false
                        }
                    }
                    if (isCorrect) {
                        dispatch(setMessage(JSON.parse(content), 0, 0, 0))
                    } else {
                        alert("Неверный формат JSON файла")
                    }
                } else {
                    alert("Неверный формат JSON файла")
                }
            }
        };
        file.target.value = '';
    }, []);
    if (isTablet || isMobile) {
        return (
            <IconButtons icon={null} text={"Загрузить"} children={<input
                type="file"
                accept="application/json"
                hidden
                id="input-field"
                onChange={handleFileChosen}
            />}/>

        );
    } else {
        return (
            <IconButtons icon={<UploadIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 2}}/>} children={<input
                type="file"
                accept="application/json"
                hidden
                id="input-field"
                onChange={handleFileChosen}
            />}/>
        );
    }
}
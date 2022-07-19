import * as React from 'react';
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {MessageState} from "../../type";
import {useMemo} from "react";
import JSONPretty from 'react-json-pretty';
import {Card, CardContent} from "@mui/material";

const JSONStyle = {
    background: "#ffffff",
    overflow: "auto",
    maxHeight: "700px"
}

const divStyle = {
    display: "flex",
    flexFlow: "column",
    alignContent: "center",
    marginRight: "1em",
}

const headingStyle = {
    margin: "auto",
}

export default function Info() {


    const params = useParams();
    const messages = useSelector(
        (state: { messages: MessageState }) => {
            return state.messages.messages;
        }
    )
    const info = useMemo(() => messages[Number(params.id)], [messages, params.id])
    if (info) {
        const date = new Date(info.time)
        const dateMessage = date.getHours().toString() + ":" + date.getMinutes().toString() + ":" + date.getSeconds().toString()
            + " " + date.getDate().toString() + "." + date.getMonth().toString() + "." + date.getFullYear().toString();
        return (
            <div style={divStyle}>
                <h1 style={headingStyle}>{dateMessage}</h1>
                <Card variant="outlined">
                    <CardContent>
                        <JSONPretty id="json-pretty" data={info.info} style={JSONStyle} mainStyle="color:black"
                                    valueStyle="color: blue" keyStyle="color:red" booleanStyle="color: Green"
                                    stringStyle="color: Maroon" errorStyle="color:Bisque"></JSONPretty>
                    </CardContent>
                </Card>
            </div>

        )
            ;
    } else {
        return (null);
    }
}

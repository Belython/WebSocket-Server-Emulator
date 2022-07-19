import React from "react";
import {IconButton} from "@mui/material";


export interface IIConButton {
    icon?: React.ReactNode,
    text?: string,
    children?: React.ReactNode,
    onClick?(e: React.MouseEvent): void
}

const iconButtonStyle = {
    mr: "2",
    display: "{ xs: 'flex', md: 'flex' }",
    color: 'inherit',
    textDecoration: 'none',
}

export default function IconButtons({text, icon, children, onClick}: IIConButton) {
    return (
        <IconButton
            style={iconButtonStyle}
            component="label"
            onClick={onClick}
        >
            {icon}
            {text}
            {children}
        </IconButton>);

}
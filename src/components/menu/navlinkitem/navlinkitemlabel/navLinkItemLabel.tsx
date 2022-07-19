import {Typography} from "@mui/material";
import * as React from "react";

type Props = {
    children: any
}

export const NavLinkItemLabel: React.FC<Props> = ({children}) => {
    return (
        <Typography
            sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "99%"
            }}
        >
            {children}
        </Typography>);
}
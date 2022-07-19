import Typography from "@mui/material/Typography";
import * as React from "react";
import {Box} from "@mui/material";

export interface IMenuItem {
    children: React.ReactNode,
}


export default function ItemMenu({children}: IMenuItem) {
    return (
        <Box sx={{display: {xs: 'none', md: 'flex'}}}>
            <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                    mr: 2,
                    display: {xs: 'flex', md: 'flex'},
                    color: 'inherit',
                    textDecoration: 'none',
                }}
            >
                {children}
            </Typography>
        </Box>
    );
}
import React from "react";
import {Box, Grid} from "@mui/material";

export interface ISinglePaneLayoutProps {
    children: React.ReactNode;
    menu: React.ReactNode;
}

function SinglePaneLayout({children, menu}: ISinglePaneLayoutProps) {
    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {menu}
                </Grid>
                <Grid item xs={12}>
                    {children}
                </Grid>
            </Grid>
        </Box>
    );

}

export default SinglePaneLayout;

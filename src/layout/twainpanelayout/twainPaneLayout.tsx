import React from "react";
import {Box, Divider, Grid} from "@mui/material";

export interface ISinglePaneLayoutProps {
    menu: React.ReactNode;
    children: [React.ReactNode, React.ReactNode];
}

function TwainPaneLayout({menu, children}: ISinglePaneLayoutProps) {
        return (
            <Box>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        {menu}
                    </Grid>
                    <Grid item xs={5.9}>
                        {children[0]}
                    </Grid>
                    <Divider sx={{height: "auto"}} orientation="vertical"/>
                    <Grid item xs={6}>
                        {children[1]}
                    </Grid>
                </Grid>
            </Box>
        );

}

export default TwainPaneLayout;

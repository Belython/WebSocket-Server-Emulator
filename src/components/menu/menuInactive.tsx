import * as React from 'react';
import Toolbar from "@mui/material/Toolbar";
import MapIcon from "@mui/icons-material/Map";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AppBar from "@mui/material/AppBar";
import {Box, IconButton, Menu, MenuItem, Tab, Tabs, Tooltip, useMediaQuery} from "@mui/material";
import {NavLink} from "react-router-dom";
import Settings from "./settings/settings";
import MenuItems from "./menuitem/menuItem";
import NavLinkItem from "./navlinkitem/navLinkItem";
import isElectron from "is-electron";
import IconButtons from "../iconbutton/iconButton";
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import Help from "./help/help";
import Download from "./download/download";
import {useCallback} from "react";
import MenuIcon from "@mui/icons-material/Menu";


const navLinkStyle = {
    fontWeight: 700,
    letterSpacing: '.3rem',
    color: 'inherit',
    textDecoration: 'none',
}

export default function MenuInactive() {
    const isTablet = useMediaQuery('(max-width:900px)');
    const isMobile = useMediaQuery('(max-width:425px');

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }, []);
    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, []);

    if ((isTablet || isMobile) && !isElectron()) {
        return (
            <AppBar position="sticky" id="menu">
                <Toolbar>
                    <NavLink style={navLinkStyle} to="/">
                        <MapIcon href="/" fontSize="large" sx={{display: {xs: 'flex', md: 'flex'}, mr: 2}}/>
                    </NavLink>
                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'flex'}}}>
                        <Tabs>
                            <NavLinkItem children={<Tab
                                icon={<RadioButtonCheckedIcon fontSize="large"
                                                              sx={{display: {xs: 'flex', md: 'flex'}, mr: 1}}/>}
                                iconPosition="start" style={navLinkStyle}/>} path={"/write"} style={navLinkStyle}/>
                            <NavLinkItem children={<Tab
                                icon={<PlayArrowIcon fontSize="large" sx={{display: {xs: 'flex', md: 'flex'}, mr: 1}}/>}
                                iconPosition="start" style={navLinkStyle}/>} path={"/read"} style={navLinkStyle}/>
                        </Tabs>
                    </Box>
                    <MenuItems children={<Settings
                        isActive={true}/>}/>
                </Toolbar>
            </AppBar>
        );
    } else if (!isElectron()) {
        return (
            <AppBar position="sticky" id="menu">
                <Toolbar>
                    <NavLinkItem
                        children={<MapIcon href="/" sx={{display: {xs: 'flex', md: 'flex'}, mr: 2}}/>}
                        path={"/"} style={navLinkStyle}/>
                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'flex'}}}>
                        <Tabs>
                            <NavLinkItem children={<Tab
                                icon={<RadioButtonCheckedIcon
                                    sx={{display: {xs: 'flex', md: 'flex'}, mr: 1}}/>}
                                iconPosition="start" label="Запись" style={navLinkStyle}/>} path={"/write"}
                                         style={navLinkStyle}/>
                            <NavLinkItem children={<Tab
                                icon={<PlayArrowIcon sx={{display: {xs: 'flex', md: 'flex'}, mr: 1}}/>}
                                iconPosition="start" label="Воспроизведение" style={{
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                            }}/>} path={"/read"} style={navLinkStyle}/>
                        </Tabs>
                    </Box>
                    <MenuItems children={<Settings
                        isActive={false}/>}/>
                </Toolbar>
            </AppBar>
        );
    } else if ((isTablet || isMobile) && isElectron()) {
        return (
            <AppBar position="sticky" id="menu">
                <Toolbar>
                    <NavLink style={navLinkStyle} to="/">
                        <MapIcon href="/" fontSize="large" sx={{display: {xs: 'flex', md: 'flex'}, mr: 2}}/>
                    </NavLink>
                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'flex'}}}>
                        <Tabs>
                            <NavLinkItem children={<Tab
                                icon={<RadioButtonCheckedIcon fontSize="large"
                                                              sx={{display: {xs: 'flex', md: 'flex'}, mr: 1}}/>}
                                iconPosition="start" style={navLinkStyle}/>} path={"/write"} style={navLinkStyle}/>
                            <NavLinkItem children={<Tab
                                icon={<PlayArrowIcon fontSize="large" sx={{display: {xs: 'flex', md: 'flex'}, mr: 1}}/>}
                                iconPosition="start" style={navLinkStyle}/>} path={"/read"} style={navLinkStyle}/>
                        </Tabs>
                    </Box>
                    <Box sx={{display: {xs: 'flex', md: 'flex'}}}>
                        <IconButton style={navLinkStyle}
                                    id="basic-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}>
                            <MenuIcon
                                sx={{display: {xs: 'flex', md: 'flex'}, mr: 1}}/>
                        </IconButton>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <Help/>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
        );
    } else {
        return (<AppBar position="sticky" id="menu">
            <Toolbar>
                <NavLinkItem
                    children={<MapIcon href="/" sx={{display: {xs: 'flex', md: 'flex'}, mr: 2}}/>}
                    path={"/"} style={navLinkStyle}/>
                <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'flex'}}}>
                    <Tabs>
                        <NavLinkItem children={<Tab
                            icon={<RadioButtonCheckedIcon
                                sx={{display: {xs: 'flex', md: 'flex'}, mr: 1}}/>}
                            iconPosition="start" label="Запись" style={navLinkStyle}/>} path={"/write"}
                                     style={navLinkStyle}/>
                        <NavLinkItem children={<Tab
                            icon={<PlayArrowIcon sx={{display: {xs: 'flex', md: 'flex'}, mr: 1}}/>}
                            iconPosition="start" label="Воспроизведение" style={{
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                        }}/>} path={"/read"} style={navLinkStyle}/>
                    </Tabs>
                </Box>
                <Help/>
            </Toolbar>
        </AppBar>);
    }
}

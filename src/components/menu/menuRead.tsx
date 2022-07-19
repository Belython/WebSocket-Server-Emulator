import * as React from 'react';
import Settings from "./settings/settings"
import Download from "./download/download";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MapIcon from "@mui/icons-material/Map";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import {Box, IconButton, Menu, MenuItem, Tab, Tabs, Tooltip, useMediaQuery} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import ItemMenu from "./menuitem/menuItem";
import NavLinkItem from "./navlinkitem/navLinkItem";
import {useCallback} from "react";
import isElectron from "is-electron";
import IconButtons from "../iconbutton/iconButton";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import Help from "./help/help";

const navLinkStyle = {
    color: 'inherit',
    textDecoration: 'none',
}

const navLinkActiveStyle = {
    textDecoration: 'none',
}

export default function MenuRead() {
    const [value, setValue] = React.useState(1);

    const handleChange = useCallback((event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }, []);

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
                    <NavLinkItem
                        children={<MapIcon href="/" fontSize="large" sx={{display: {xs: 'flex', md: 'flex'}, mr: 2}}/>}
                        path={"/"} style={navLinkStyle}/>
                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'flex'}}}>
                        <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example"
                              textColor="secondary"
                              indicatorColor="secondary"
                              TabIndicatorProps={{
                                  sx: {
                                      height: "7px"
                                  }
                              }}>
                            <NavLinkItem children={<Tab
                                icon={<RadioButtonCheckedIcon
                                    sx={{display: {xs: 'flex', md: 'flex'}, mr: 1}}/>}
                                iconPosition="start" style={{
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                            }}/>} path={"/write"} style={navLinkStyle}/>
                            <Tab icon={<PlayArrowIcon
                                sx={{display: {xs: 'flex', md: 'flex'}, mr: 1}}/>}
                                 iconPosition="start" style={navLinkActiveStyle}/>
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

                            <MenuItem onClick={handleClose}><Download/></MenuItem>
                            <Tooltip title="Для подключения использовать 3010 порт">
                                <MenuItem>
                                    <IconButtons
                                        text={"Справка"}/>
                                </MenuItem>
                            </Tooltip>
                            <MenuItem><Settings isActive={false}/></MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
        );
    } else if (!isElectron()) {
        return (
            <AppBar position="sticky" id="menu">
                <Toolbar>
                    <NavLinkItem children={<MapIcon href="/" sx={{display: {xs: 'flex', md: 'flex'}, mr: 2}}/>}
                                 path={"/"} style={navLinkStyle}/>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example"
                              textColor="secondary"
                              indicatorColor="secondary"
                              TabIndicatorProps={{
                                  sx: {
                                      height: "7px"
                                  }
                              }}>
                            <NavLinkItem children={<Tab
                                icon={<RadioButtonCheckedIcon
                                    sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>}
                                iconPosition="start" label="Запись" style={navLinkActiveStyle}/>} path={"/write"}
                                         style={navLinkStyle}/>
                            <Tab icon={<PlayArrowIcon
                                sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>}
                                 iconPosition="start" label="Воспроизведение" style={navLinkActiveStyle}/>
                        </Tabs>
                    </Box>
                    <ItemMenu children={<Download/>}/>
                    <Tooltip title="Для подключения использовать 3010 порт">
                        <MenuItem>
                            <IconButtons
                                icon={<HelpCenterIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 2}}/>}
                                text={"Справка"}/>
                        </MenuItem>
                    </Tooltip>
                    <ItemMenu children={<Settings
                        isActive={false}/>}/>
                </Toolbar>
            </AppBar>
        );
    } else if ((isTablet || isMobile) && isElectron()) {
        return (
            <AppBar position="sticky" id="menu">
                <Toolbar>
                    <NavLinkItem
                        children={<MapIcon href="/" fontSize="large" sx={{display: {xs: 'flex', md: 'flex'}, mr: 2}}/>}
                        path={"/"} style={navLinkStyle}/>
                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'flex'}}}>
                        <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example"
                              textColor="secondary"
                              indicatorColor="secondary"
                              TabIndicatorProps={{
                                  sx: {
                                      height: "7px"
                                  }
                              }}>
                            <NavLinkItem children={<Tab
                                icon={<RadioButtonCheckedIcon
                                    sx={{display: {xs: 'flex', md: 'flex'}, mr: 1}}/>}
                                iconPosition="start" style={{
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                            }}/>} path={"/write"} style={navLinkStyle}/>
                            <Tab icon={<PlayArrowIcon
                                sx={{display: {xs: 'flex', md: 'flex'}, mr: 1}}/>}
                                 iconPosition="start" style={navLinkActiveStyle}/>
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

                            <MenuItem onClick={handleClose}><Download/></MenuItem>
                            <Help />
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
        );
    } else {
        return (<AppBar position="sticky" id="menu">
            <Toolbar>
                <NavLinkItem children={<MapIcon href="/" sx={{display: {xs: 'flex', md: 'flex'}, mr: 2}}/>}
                             path={"/"} style={navLinkStyle}/>
                <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                    <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example"
                          textColor="secondary"
                          indicatorColor="secondary"
                          TabIndicatorProps={{
                              sx: {
                                  height: "7px"
                              }
                          }}>
                        <NavLinkItem children={<Tab
                            icon={<RadioButtonCheckedIcon
                                sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>}
                            iconPosition="start" label="Запись" style={navLinkActiveStyle}/>} path={"/write"}
                                     style={navLinkStyle}/>
                        <Tab icon={<PlayArrowIcon
                            sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>}
                             iconPosition="start" label="Воспроизведение" style={navLinkActiveStyle}/>
                    </Tabs>
                </Box>
                <Help />
                <ItemMenu children={<Download/>}/>
            </Toolbar>
        </AppBar>);
    }
}

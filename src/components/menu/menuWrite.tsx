import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import Settings from "./settings/settings";
import MapIcon from '@mui/icons-material/Map';
import Save from "./save/save";
import {Box, IconButton, Menu, MenuItem, Tab, Tabs, Tooltip, useMediaQuery} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ItemMenu from "./menuitem/menuItem"
import NavLinkItem from "./navlinkitem/navLinkItem";
import {useCallback} from "react";
import isElectron from "is-electron";
import IconButtons from "../iconbutton/iconButton";
import SaveIcon from "@mui/icons-material/Save";
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import Help from "./help/help";

const navLinkStyle = {
    color: 'inherit',
    textDecoration: 'none',
}

const navLinkActiveStyle = {
    textDecoration: 'none',
}


export default function MenuWrite() {

    const [value, setValue] = React.useState(0);

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
                    <NavLinkItem children={<MapIcon href="/" sx={{display: {xs: 'flex', md: 'flex'}, mr: 2}}/>}
                                 path={"/"} style={navLinkStyle}/>
                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'flex'}}}>
                        <Tabs
                            value={value} onChange={handleChange} aria-label="icon label tabs example"
                            textColor="secondary"
                            indicatorColor="secondary"
                            TabIndicatorProps={{
                                sx: {
                                    height: "7px"
                                }
                            }}>
                            <Tab icon={<RadioButtonCheckedIcon
                                sx={{display: {xs: 'flex', md: 'flex'}, mr: 1}}/>}
                                 iconPosition="start" style={navLinkActiveStyle}/>
                            <NavLinkItem children={<Tab
                                icon={<PlayArrowIcon sx={{display: {xs: 'flex', md: 'flex'}, mr: 1}}/>}
                                iconPosition="start" style={navLinkActiveStyle}/>} path={"/read"} style={navLinkStyle}/>
                        </Tabs>
                    </Box>
                    <Box sx={{display: {xs: 'flex', md: 'flex'}}}>
                        <IconButton style={navLinkStyle}
                                    id="basic-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}>
                            <MenuIcon fontSize="large"
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
                            <MenuItem onClick={handleClose}><Save/></MenuItem>
                            <MenuItem><Settings isActive={false}/></MenuItem>
                            <Tooltip title="Для подключения использовать 3010 порт">
                                <MenuItem>
                                    <IconButtons
                                        text={"Справка"}/>
                                </MenuItem>
                            </Tooltip>
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
                        <Tabs
                            value={value} onChange={handleChange} aria-label="icon label tabs example"
                            textColor="secondary"
                            indicatorColor="secondary"
                            TabIndicatorProps={{
                                sx: {
                                    height: "7px"
                                }
                            }}>
                            <Tab icon={<RadioButtonCheckedIcon
                                sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>}
                                 iconPosition="start" label="Запись" style={navLinkActiveStyle}/>
                            <NavLinkItem children={<Tab
                                icon={<PlayArrowIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>}
                                iconPosition="start" label="Воспроизведение" style={navLinkActiveStyle}/>}
                                         path={"/read"} style={navLinkStyle}/>
                        </Tabs>
                    </Box>
                    <ItemMenu children={<Save/>}/>
                    <Tooltip title="Для подключения использовать 3010 порт">
                        <MenuItem>
                            <IconButtons
                                icon={<HelpCenterIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 2}}/>}
                                text={"Справка"}/>
                        </MenuItem>
                    </Tooltip>
                    <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                        <ItemMenu children={<Settings
                            isActive={false}/>}/>
                    </Box>
                </Toolbar>
            </AppBar>
        );
    } else  if ((isTablet || isMobile) && isElectron()) {
        return (<AppBar position="sticky" id="menu">
            <Toolbar>
                <NavLinkItem children={<MapIcon href="/" sx={{display: {xs: 'flex', md: 'flex'}, mr: 2}}/>}
                             path={"/"} style={navLinkStyle}/>
                <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'flex'}}}>
                    <Tabs
                        value={value} onChange={handleChange} aria-label="icon label tabs example"
                        textColor="secondary"
                        indicatorColor="secondary"
                        TabIndicatorProps={{
                            sx: {
                                height: "7px"
                            }
                        }}>
                        <Tab icon={<RadioButtonCheckedIcon
                            sx={{display: {xs: 'flex', md: 'flex'}, mr: 1}}/>}
                             iconPosition="start" style={navLinkActiveStyle}/>
                        <NavLinkItem children={<Tab
                            icon={<PlayArrowIcon sx={{display: {xs: 'flex', md: 'flex'}, mr: 1}}/>}
                            iconPosition="start" style={navLinkActiveStyle}/>} path={"/read"} style={navLinkStyle}/>
                    </Tabs>
                </Box>
                <Box sx={{display: {xs: 'flex', md: 'flex'}}}>
                    <IconButton style={navLinkStyle}
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}>
                        <MenuIcon fontSize="large"
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
                        <MenuItem onClick={handleClose}><Save/></MenuItem>
                        <Help />
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>);
    } else {
        return (<AppBar position="sticky" id="menu">
            <Toolbar>
                <NavLinkItem children={<MapIcon href="/" sx={{display: {xs: 'flex', md: 'flex'}, mr: 2}}/>} path={"/"}
                             style={navLinkStyle}/>
                <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                    <Tabs
                        value={value} onChange={handleChange} aria-label="icon label tabs example"
                        textColor="secondary"
                        indicatorColor="secondary"
                        TabIndicatorProps={{
                            sx: {
                                height: "7px"
                            }
                        }}>
                        <Tab icon={<RadioButtonCheckedIcon
                            sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>}
                             iconPosition="start" label="Запись" style={navLinkActiveStyle}/>
                        <NavLinkItem children={<Tab
                            icon={<PlayArrowIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>}
                            iconPosition="start" label="Воспроизведение" style={navLinkActiveStyle}/>} path={"/read"}
                                     style={navLinkStyle}/>
                    </Tabs>
                </Box>
                <Help />
                <ItemMenu children={<Save/>}/>
            </Toolbar>
        </AppBar>);
    }
}

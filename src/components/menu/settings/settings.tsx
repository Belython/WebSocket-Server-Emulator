import * as React from 'react';
import Button from '@mui/material/Button';
import {Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, useMediaQuery} from "@mui/material";
import {useState} from "react";
import SettingsIcon from '@mui/icons-material/Settings';

export interface IActive {
    isActive: boolean;
}

const settingsStyle = {
    mr: "2",
    display: "{md: 'flex', xs: 'flex' }",
    color: 'inherit',
    textDecoration: 'none',
}

export default function Settings({isActive}: IActive) {
    const [open, setOpen] = React.useState(false);
    const [url, setUrl] = useState('');

    const isTablet = useMediaQuery('(max-width:900px)');
    const isMobile = useMediaQuery('(max-width:425px');


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseAccept = () => {
        setOpen(false);
        localStorage.setItem('url', url);
    };


    if ((isTablet || isMobile) && !isActive) {
        return (
            <div>
                <IconButton
                    style={settingsStyle}
                    onClick={handleClickOpen}
                >
                    Настройки
                </IconButton>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Настройки</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="url"
                            label="Введите url"
                            type="string"
                            fullWidth
                            variant="standard"
                            onChange={e => setUrl(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Отменить</Button>
                        <Button onClick={handleCloseAccept}>Принять</Button>
                    </DialogActions>
                </Dialog>
            </div>);
    } else if (isActive) {
        return (
            <div>
                <IconButton
                    style={settingsStyle}
                    onClick={handleClickOpen}
                >
                    <SettingsIcon sx={{display: {md: 'flex'}}}/>
                </IconButton>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Настройки</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="url"
                            label="Введите url"
                            type="string"
                            fullWidth
                            variant="standard"
                            onChange={e => setUrl(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Отменить</Button>
                        <Button onClick={handleCloseAccept}>Принять</Button>
                    </DialogActions>
                </Dialog>
            </div>);
    } else {

        return (
            <div>
                <IconButton
                    style={settingsStyle}
                    onClick={handleClickOpen}
                >
                    <SettingsIcon sx={{display: {md: 'flex'}, mr: 2}}/>
                    Настройки
                </IconButton>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Настройки</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="url"
                            label="Введите url"
                            type="string"
                            fullWidth
                            variant="standard"
                            onChange={e => setUrl(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Отменить</Button>
                        <Button onClick={handleCloseAccept}>Принять</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

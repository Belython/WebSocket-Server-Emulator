// const {app, BrowserWindow} = require('electron')
// const Network = require('./network')
//
// const path = require ('path');
// const url = require ('url');
//
// function createWindow() {
//     const win = new BrowserWindow({
//         autoHideMenuBar: false,
//         width: 1920,
//         height: 1080,
//         webPreferences: {
//             nodeIntegration: true
//
//         }
//     })
//
//     win.setMenuBarVisibility(false)
//
//
//     const startUrl = process.env.ELECTRON_START_URL || url.format({
//         pathname: path.join(__dirname, '../index.html'),
//         protocol: 'file:',
//         slashes: true
//     });
//     win.loadURL(startUrl);
//
// }
//
// Network();
//
// app.whenReady().then(createWindow)
//
// app.on('window-all-closed', () => {
//     if (process.platform !== 'darwin') {
//         app.quit()
//     }
// })
//
// app.on('activate', () => {
//
//     if (BrowserWindow.getAllWindows().length === 0) {
//         createWindow()
//     }
// })
//
// const setupEvents = require('./installers/setupEvents')
// if (setupEvents.handleSquirrelEvent()) {
//     // squirrel event handled and app will exit in 1000ms, so don't do anything else
//     return;
// }

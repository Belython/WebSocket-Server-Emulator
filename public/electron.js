const {app, BrowserWindow} = require('electron')
const Network = require('./network')
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        autoHideMenuBar: false,
        width: 1920,
        height: 1080,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: true
        }
    });
    mainWindow.maximize();
    mainWindow.show();
    mainWindow.loadURL(

        isDev
            ? "http://localhost:3000"
            : `file://${path.join(__dirname, "../build/index.html")}`
    );
    mainWindow.on('closed', () => mainWindow = null);
    mainWindow.setMenuBarVisibility(false)
    // mainWindow.webContents.openDevTools();
}

Network();

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
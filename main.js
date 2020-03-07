const path = require('path')
const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const Downloader = require('./downloader')

// !: WINDOW SHIZZ =================

let win

const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 290,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')
  win.setMenuBarVisibility(false)

  // win.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// !: IPC SHIZZ =================

// TODO: Look into using save file dialog
// https://stackoverflow.com/questions/53835596/get-created-files-path-from-savefiledialog-in-electron

ipcMain.on('download', async (event, link) => {
  const id = link.split('?v=')[1]

  const dir = await dialog.showOpenDialog(win, {
    properties: ['openDirectory']
  })

  const outputPath = dir.filePaths[0]
  const downloader = new Downloader({ outputPath })
  downloader.downloadMP3({ id, event })
})

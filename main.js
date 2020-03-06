const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const ffmpegPath = require('ffmpeg-static')
const YoutubeMp3Downloader = require('youtube-mp3-downloader')

// require('electron-reload')(__dirname)

// !: WINDOW SHIZZ =================

let win

const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 295,
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

// !: FRONTEND SHIZZ =================

ipcMain.on('download', async (event, link) => {
  const id = link.split('?v=')[1]

  let dir = await dialog.showOpenDialog(win, {
    properties: ['openDirectory']
  })

  let path = dir.filePaths[0]

  downloadMP3(id, path, event)
})

// !: DOWNLOADER SHIZZ =================

// TODO: Move all of this to seperate file!

const downloadMP3 = (id, path, event) => {
  const downloader = new YoutubeMp3Downloader({
    ffmpegPath,
    outputPath: path,
    youtubeVideoQuality: 'highest',
    queueParallelism: 1,
    progressTimeout: 100
  })

  downloader.download(id)

  downloader.on('finished', (err, data) => {
    console.log({ data })
    event.sender.send('download-complete', 'Download complete!')
  })

  downloader.on('error', error => {
    console.log({ error })
    event.sender.send(
      'download-error',
      'Something went wrong! Check URL and try again.'
    )
  })

  downloader.on('progress', progress => {
    console.log(JSON.stringify(progress))
    event.sender.send('download-progress', progress.progress.percentage)
  })
}

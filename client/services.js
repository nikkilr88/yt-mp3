const EventEmitter = require('./EventEmitter')

class Service extends EventEmitter {
  constructor() {
    super()
  }

  downloadMP3 = link => {
    ipcRenderer.send('download', link)

    ipcRenderer.on('download-progress', (event, percentage) => {
      this.emit('service:downloading', percentage)
    })

    ipcRenderer.on('download-complete', () => {
      this.emit('service:complete')
    })

    ipcRenderer.on('download-error', (event, errorMessage) => {
      display.innerHTML = `<p class='error'>${errorMessage}</p>`
    })
  }
}

module.exports = Service

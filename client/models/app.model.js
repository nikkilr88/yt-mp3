const EventEmitter = require('../EventEmitter')

class AppModel extends EventEmitter {
  constructor() {
    super()
    this.message = 'Paste a video link below'
    this.type = 'INFO'
    this.download_percentage = 0
  }

  updateDisplayMessage = ({ message, type } = { type: 'INFO' }) => {
    this.message = message
    this.type = type

    this.emit('message:update', { message, type })
  }

  updateDownloadPercentage = percentage => {
    this.download_percentage = percentage
  }
}

module.exports = AppModel

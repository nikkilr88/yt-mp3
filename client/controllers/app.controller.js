const Service = require('../services')

class AppController {
  constructor({ view, model, service }) {
    this._view = view
    this._model = model
    this._service = service

    view.on('download:start', url => this.startDownload(url))

    service.on('service:downloading', percentage => {
      this.updateDisplayMessage({
        message: `Downloading: ${Math.round(percentage)}% complete...`,
        type: 'DOWNLOADING'
      })

      this.updatePercentage(percentage)
    })

    service.on('service:complete', percentage =>
      this.updateDisplayMessage({
        message: `Download complete!`,
        type: 'SUCCESS'
      })
    )
  }

  startDownload = url => {
    this._service.downloadMP3(url)
  }

  updateDisplayMessage = ({ message, type }) => {
    this._model.updateDisplayMessage({ message, type })
    this._view.render()
  }

  updatePercentage = percentage => {
    this._model.updateDownloadPercentage(percentage)
    this._view.render()
  }
}

module.exports = AppController

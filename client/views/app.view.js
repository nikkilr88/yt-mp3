const EventEmitter = require('../event-emitter')
const AppModel = require('../models/app.model.js')

class AppView extends EventEmitter {
  constructor({ model }) {
    super()

    this._model = model

    this.button = document.querySelector('.download-btn')
    this.input = document.querySelector('.input')
    this.display = document.querySelector('.display')

    this.addEventListeners()
  }

  addEventListeners = () => {
    this.button.addEventListener('click', event => {
      event.preventDefault()
      this.emit('download:start', this.input.value)
    })
  }

  render = () => {
    const message = this._model.message
    const type = this._model.type
    const downloadPercentage = this._model.download_percentage

    console.log({ type, downloadPercentage })
    this.display.innerHTML = `
      <p class="${type}"> ${message} 
        <span class="progress" style="width:${
          type === 'DOWNLOADING' ? downloadPercentage : '100'
        }%" />
      </p>`
  }
}

module.exports = AppView

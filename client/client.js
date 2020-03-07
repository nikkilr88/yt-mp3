const { ipcRenderer } = require('electron')
const AppModel = require('./client/models/app.model.js')
const AppView = require('./client/views/app.view.js')
const AppController = require('./client/controllers/app.controller.js')
const Service = require('./client/services')

const service = new Service()
const model = new AppModel()
const view = new AppView({ model })

const controller = new AppController({
  view,
  model,
  service
})

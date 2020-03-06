const { ipcRenderer } = require('electron')

// !: DOM Elements
const downloadBtn = document.querySelector('.download-btn')
const input = document.querySelector('.input')
const display = document.querySelector('.display')

downloadBtn.addEventListener('click', e => {
  e.preventDefault()

  if (input.value !== '') {
    downloadMP3(input.value)
  }
})

const downloadMP3 = link => {
  ipcRenderer.send('download', link)

  ipcRenderer.on('download-progress', (event, percentage) => {
    display.innerHTML = `
    <p class="downloading"> Downloading: ${Math.round(percentage)}% complete 
      <span class="progress" style="width:${percentage}%;" />
    </p>`
  })

  ipcRenderer.on('download-complete', (event, message) => {
    display.innerHTML = `<p class='success'>${message}</p>`
    input.value = ''
  })

  ipcRenderer.on('download-error', (event, errorMessage) => {
    display.innerHTML = `<p class='error'>${errorMessage}</p>`
  })
}

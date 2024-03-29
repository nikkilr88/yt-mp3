const YoutubeMp3Downloader = require('youtube-mp3-downloader')
const ffmpegPath = require('ffmpeg-static')

class Downloader {
  constructor({ outputPath }) {
    this.downloader = new YoutubeMp3Downloader({
      ffmpegPath,
      outputPath,
      youtubeVideoQuality: 'highest',
      queueParallelism: 1,
      progressTimeout: 100
    })
  }

  downloadMP3 = ({ id, event }) => {
    this.downloader.download(id)

    this.downloader.on('finished', (err, data) => {
      event.sender.send('download-complete', 'Download complete!')
    })

    this.downloader.on('error', error => {
      console.log({ error })
      event.sender.send(
        'download-error',
        'Something went wrong! Check URL and try again.'
      )
    })

    this.downloader.on('progress', progress => {
      event.sender.send('download-progress', progress.progress.percentage)
    })
  }
}

module.exports = Downloader

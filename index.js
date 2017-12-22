const { app, shell } = require('electron')

const NoTorrent = require('./notorrent')

const noTorrent = new NoTorrent()

const isSecondInstance = app.makeSingleInstance((argv, workingDirectory) => {
  console.log(argv)
  noTorrent.addTorrent(argv[2])
})

if (isSecondInstance) {
  app.quit()
}

noTorrent.addTorrent(process.argv[2])

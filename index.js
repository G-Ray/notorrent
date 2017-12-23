const { app } = require('electron')

const NoTorrent = require('./notorrent')

const noTorrent = new NoTorrent()

const isSecondInstance = app.makeSingleInstance((argv, workingDirectory) => {
  noTorrent.addTorrent(argv[2])
})

if (isSecondInstance) {
  app.quit()
}

noTorrent.addTorrent(process.argv[2])

const { app } = require('electron')

const NoTorrent = require('./notorrent')
const utils = require('./lib/utils')

const noTorrent = new NoTorrent()

const isSecondInstance = app.makeSingleInstance((argv, workingDirectory) => {
  let args = utils.sliceArgv(argv)
  noTorrent.addTorrent(args[0])
})

if (isSecondInstance) {
  app.quit()
}

let args = utils.sliceArgv(process.argv)
noTorrent.addTorrent(args[0])

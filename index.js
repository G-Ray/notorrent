const { app } = require('electron')

const NoTorrent = require('./notorrent')
const utils = require('./lib/utils')

const noTorrent = new NoTorrent()

const lock = app.requestSingleInstanceLock()

if (!lock) {
  return app.quit()
}

app.on('second-instance', (event, argv, workingDirectory) => {
  const args = utils.sliceArgv(argv)
  noTorrent.addTorrent(args[0])
})

const args = utils.sliceArgv(process.argv)
noTorrent.addTorrent(args[0])

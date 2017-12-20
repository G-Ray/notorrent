const {app, shell } = require('electron')
const WebTorrent = require('webtorrent')

const Server = require('./lib/server')

const client = new WebTorrent()

const isSecondInstance = app.makeSingleInstance((argv, workingDirectory) => {
  console.log(argv)
})

if (isSecondInstance) {
  app.quit()
}

client.add(process.argv[2], (torrent) => {
  let server = new Server(torrent)
  server.listen(8080)
  shell.openExternal('http://localhost:8080')
})

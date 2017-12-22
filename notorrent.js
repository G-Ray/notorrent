const { shell } = require('electron')
const WebTorrent = require('webtorrent')

const Server = require('./lib/server')

const client = new WebTorrent()

class NoTorrent {
  
  constructor () {
    this._torrents = []
  }

  addTorrent (magnet) {
    client.add(magnet, (torrent) => {
      console.log('addTorrent')
      this._torrents.push(torrent)
      let server = new Server(torrent)
      server.listen()
      let address = server.address()
      shell.openExternal('http://localhost:' + address.port)
    })
  }
}

module.exports = NoTorrent

const { shell, Notification } = require('electron')
const WebTorrent = require('webtorrent')
const mem = require('memory-chunk-store')

const Server = require('./lib/server')

const client = new WebTorrent()

class NoTorrent {
  
  constructor () {
    this._torrents = []
  }

  _showNotification (torrent) {
    let notif = new Notification({
      title: 'NoTorrent',
      body: torrent.name + ' is downloading'
    })

    notif.on('show', () => console.log('show'))
    notif.show()
  }

  addTorrent (magnet) {
    client.add(magnet, { store: mem }, (torrent) => {
      console.log('addTorrent')
      // torrent.files.forEach(f => f.deselect())
      this._torrents.push(torrent)
      let server = new Server(torrent)
      server.listen()
      let address = server.address()
      this._showNotification(torrent)
      shell.openExternal('http://localhost:' + address.port + '/' + torrent.files.length)
    })
  }
}

module.exports = NoTorrent

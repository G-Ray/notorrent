const { shell, Notification } = require('electron')
const WebTorrent = require('webtorrent')

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
    client.add(magnet, (torrent) => {
      console.log('addTorrent')
      this._torrents.push(torrent)
      let server = new Server(torrent)
      server.listen()
      let address = server.address()
      this._showNotification(torrent)
      // shell.openExternal('http://localhost:' + address.port + '/0')
    })
  }
}

module.exports = NoTorrent

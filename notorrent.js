const { shell, Notification } = require('electron')
const WebTorrent = require('webtorrent')
const mem = require('memory-chunk-store')

const Server = require('./lib/server')

const client = new WebTorrent()

class NoTorrent {
  constructor () {
    this._torrents = []
  }

  _showNotification (msg) {
    let notif = new Notification({
      title: 'NoTorrent',
      body: msg
    })
    notif.show()
  }

  _onTimeout (torrent) {
    console.log('timeOut')
    torrent.destroy()
    this._showNotification('This torrent has not enough seeders, please try another one')
  }

  addTorrent (magnet) {
    console.log('addTorrent')
    let torrent = client.add(magnet, { store: mem }, (torrent) => {
      clearTimeout(timeout)
      this._torrents.push(torrent)
      let server = new Server(torrent)
      server.listen()
      let address = server.address()
      this._showNotification(torrent.name + ' is downloading')
      let length = torrent.files.length
      let index = length > 1 ? length : 0
      shell.openExternal('http://localhost:' + address.port + '/' + index)
    })

    let timeout = setTimeout(() => this._onTimeout(torrent), 10000)
  }
}

module.exports = NoTorrent

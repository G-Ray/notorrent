const config = require('../config')

module.exports = {
  sliceArgv: sliceArgv
}

// Remove leading args.
// Production: 1 arg, eg: NoTorrent
// Development: 2 args, eg: electron .
function sliceArgv (argv) {
  return argv.slice(config.IS_PRODUCTION ? 1 : 2)
}
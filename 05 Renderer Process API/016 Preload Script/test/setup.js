const path = require('path')
const { Application } = require('spectron')

const appPath = () => {
  switch (process.platform) {
    case 'darwin':
      return path.join(__dirname, '..', '.tmp', 'mac', 'Electron.app', 'Contents', 'MacOS', 'Electron')
    case 'linux':
      return path.join(__dirname, '..', '.tmp', 'linux', 'Electron')
    case 'win32':
      return path.join(__dirname, '..', '.tmp', 'win-unpacked', 'Electron.exe')
    default:
      throw Error(`Unsupported platform ${process.platform}`)
  }
}
global.app = new Application({ path: appPath() })

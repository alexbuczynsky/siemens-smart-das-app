const electron = require('electron');
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: 'index.html',
    protocol: 'file',
    slashes: true
  }))

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {

  electron.protocol.interceptFileProtocol('file', (request, callback) => {
    const url = request.url.substr(7)    /* all urls start with 'file://' */
    callback({ path: path.normalize(`${__dirname}/${url}`) })
  }, (err) => {
    if (err) console.error('Failed to register protocol')
  })
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
     createWindow()
  }
})
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

const os = require('os');
var apiProcess = null;

startApi().then(createWindow);

function startApi() {
  var proc = require('child_process').spawn;
  //  run server
  let apipath = '';
  return new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(), 30000)
      switch(os.platform()){
      case 'windows':
        apipath = path.join(__dirname, '..\\..\\server\\bin\\dist\\win\\BreakerConfigAPI.exe')
        break;
      case 'darwin':
        apipath = path.join(__dirname, '..//..//server//bin//dist//osx//BreakerConfigAPI');
        break;
      case 'linux':
        apipath = path.join(__dirname, '..//..//server//bin//dist//linux//BreakerConfigAPI');
        break;
      default:
        apipath = path.join(__dirname, '..//..//server//bin//dist//linux//BreakerConfigAPI');
    }
    apiProcess = proc(apipath)

    apiProcess.stdout.on('data', (data) => {
      writeLog('api-log:', data);
      if(data.includes('Now listening')){
          
          clearTimeout(timer);
          resolve();
        }
    });
  })
  
}

//Kill process when electron exits
process.on('exit', function () {
  writeLog('exit');
  apiProcess.kill();
});

function writeLog(...args){
  console.log(`${args.join('')}`);
}
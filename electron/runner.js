'use strict';
var app = require('app');
var BrowserWindow = require('browser-window');
var client = require('electron-connect').client;
require('electron-debug')({
  showDevTools: true
});

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function () {
  var mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false
  });
  mainWindow.loadUrl('file://' + __dirname + '/index.html');
  client.create(mainWindow);
});

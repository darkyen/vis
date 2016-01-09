'use strict';
var app = require('app');
var BrowserWindow = require('browser-window');
var client = require('electron-connect').client;

app.on('ready', function () {
  var mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  });
  mainWindow.loadUrl('file://' + __dirname + '/index.html');
  client.create(mainWindow);
});

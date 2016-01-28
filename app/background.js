// This is main process of Electron, started as first thing when the Electron
// app starts, and running through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.
'use strict';
(function() {
  // First, if we were launched with a squirrel event argument, handle that and die.
  if (require('electron-squirrel-startup')) return;

  var app = require('app');
  var BrowserWindow = require('browser-window');
  var env = require('./vendor/electron_boilerplate/env_config');
  var devHelper = require('./vendor/electron_boilerplate/dev_helper');
  var windowStateKeeper = require('./vendor/electron_boilerplate/window_state');
  var electronReload = require('electron-reload');
  var autoUpdater = require('auto-updater');
  var os = require('os');
  var fs = require('fs');

  var mainWindow;

  // Setup global crash logging - electron doesn't do this well in production by default
  var error = function(error) {
      debugger;
      console.error(error);
      var message;

      switch (typeof error) {
          case "object":
              message = "Uncaught Exception: " + error.code + "\n" + error.message + "\n" + error.stack;
              break;
          case "string":
              message = error;
              break;
      }

      var errorFilename = process.cwd() + "\\crash.log";
      dialog.showErrorBox("Oops!", "I messed up :(\nThe full confession note is in " + errorFilename);
      try {
        fs.writeFileSync(errorFilename, message, 'utf-8');
      } catch (err) {
        throw err;
      }
  }
  process.on('uncaughtException', error);

  // Preserver of the window size and position between app launches.
  var mainWindowState = windowStateKeeper('main', {
      width: 1000,
      height: 600
  });

  app.on('ready', function () {
      mainWindow = new BrowserWindow({
          x: mainWindowState.x,
          y: mainWindowState.y,
          width: mainWindowState.width,
          height: mainWindowState.height,
          frame: false
      });

      if (mainWindowState.isMaximized) {
          mainWindow.maximize();
      }

      if (env.name === 'test') {
          mainWindow.loadURL('file://' + __dirname + '/spec.html');
      } else {
          mainWindow.loadURL('file://' + __dirname + '/app.html');
      }

      if (env.name !== 'production') {
          electronReload(__dirname);
          devHelper.setDevMenu();
          mainWindow.openDevTools();
      } else {
        // Check for updates
        autoUpdater.setFeedURL(
          'https://s3-us-west-2.amazonaws.com/media-electron/squirrel/MediaComplete-'
          + os.platform() + "-" + os.arch());
        autoUpdater.checkForUpdates();
      }

      mainWindow.on('close', function () {
          mainWindowState.saveState(mainWindow);
      });
  });

  app.on('window-all-closed', function () {
      app.quit();
  });
})();

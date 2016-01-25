'use strict';

var gulp = require('gulp');
var packager = require('electron-packager');
var squirrel = require('electron-installer-squirrel-windows');

// Call packager, then loop over the output and create a squirrel installer for each package
gulp.task('release', ['build'], function () {
  packager({
    "name":       "MediaComplete",
    "arch":       "x64",
    "platform":   "win32",
    "dir":        "./build",
    "asar":       true,
    "icon":       "./windows/icon.ico",
    "out":        "./package",
    "overwrite":  true
  }, function done (err, appPath) {
    if (!err) {
      for (var i = 0; i < appPath.length; i++) {
        var releaseArch = appPath[i].split("\\")[1];
        console.info("Creating squirrel installer for " + releaseArch);
        squirrel({
          "path": __dirname + "\\..\\" + appPath[i],
          "out": "release\\" + releaseArch,
          "remote_releases": "https://raw.githubusercontent.com/MediaComplete/MediaComplete.github.io/master/download/" + releaseArch,
          "overwrite": true
        }, function done (err) {
          console.error(err);
        });
      }
    } else {
      console.error(err);
    }
  });
});

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
    "out":        "./package",
    "overwrite":  true,
    "icon":       __dirname + "\\..\\resources\\logo_small.ico",
    "version-string": {
      "CompanyName": "Void Pointer",
      "LegalCopyright": "You are legally entitled to do whatever you want with this.",
      "FileDescription": "A music manager for a modern audience.",
      "OriginalFilename": "MediaComplete.exe",
      "ProductName": "Media Complete",
      "InternalName": "MediaComplete"
    }
  }, function done (err, appPath) {
    if (!err) {
      for (var i = 0; i < appPath.length; i++) {
        // Here we assume the paths are "package\<arch>"
        var releaseArch = appPath[i].split("\\")[1];
        console.info("Creating squirrel installer for " + releaseArch);
        squirrel({
          "path": __dirname + "\\..\\" + appPath[i],
          "out": "release\\" + releaseArch,
          "remote_releases": "https://s3-us-west-2.amazonaws.com/media-electron/squirrel/" + releaseArch,
          "overwrite": true,
          "loading_gif": __dirname + "\\..\\resources\\logo_large.gif",
          "setup_icon": ".\\resources\\logo_small.ico"
        }, function done (err) {
          if (err != null)
          {
            console.error(err);
            process.exit(1);  
          }
        });
      }
    } else {
      console.error(err);
      process.exit(1);
    }
  });
});

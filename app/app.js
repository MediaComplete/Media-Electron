// Here is the starting point for code of your own application.
// All stuff below is just to show you how it works. You can delete all of it.

// Modules which you authored in this project are intended to be
// imported through new ES6 syntax.
import { greet } from './hello_world/hello_world';

// Node.js modules and those from npm
// are required the same way as always.
var os = require('os');
var jetpack = require('fs-jetpack');
var $ = require('jquery');
require('jquery-ui');

// Holy crap! This is browser window with HTML and stuff, but I can read
// here files like it is node.js! Welcome to Electron world :)
var manifest = require('./package.json');

$(function() {
  $(".resizable").resizable();
});

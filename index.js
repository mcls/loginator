var win = gui.Window.get();

var require = node;

var ansispan = require('ansispan');
var fs = require('fs');
var LogTracker = require('log-tracker');

// Use custom colors
ansispan.foregroundColors = {
  '30': '#F56E75', // black
  '31': '#BE3532', // red
  '32': '#8A9824', // green
  '33': '#A88820', // yellow
  '34': '#268bd2', // blue
  '35': '#6D6CD3', // purple
  '36': '#96A0A0', // default: cyan
  '37': '#F7F5E3'
};

var codeify = function(data) {
  var stringified = String(data);
  stringified = stringified.split("\n").join("</p><p class='code'>");
  return "<p class='code'>" + stringified + "</p>";
};

window.openFile = function() {
  var body    = document.querySelector('body');
  var logArea = document.querySelector('.js-log-area');
  logArea.innerHTML = '';

  var logPath = document.querySelector('.filepath').getAttribute('value');
  var logTracker = new LogTracker(logPath);
  logTracker.on("data", function (data) {
    logArea.innerHTML = logArea.innerHTML + ansispan(codeify(data));
    body.scrollTop = body.scrollHeight;
  });
};

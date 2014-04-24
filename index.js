var win = gui.Window.get();


var fs = node('fs');
var LogFiles      = require('log-files');
var LogFormatter  = require('log-formatter');
var LogTracker    = require('log-tracker');

var database = require('database');
database.onDbReady = function() {
  var logs = LogFiles.findAll(function(logs) {
    console.log("All stored logs:", logs);
  });
};

var trackLog = function(filepath) {
  LogFiles.add(filepath);
  var logTracker = new LogTracker(filepath);
  var body = document.querySelector('body');
  var logArea = document.querySelector('.js-log-area');
  logArea.innerHTML = '';

  logTracker.on("data", function (data) {
    var html = new LogFormatter(data).toHtml();
    logArea.innerHTML = logArea.innerHTML + html;
    body.scrollTop = body.scrollHeight;
  });
};

window.openFile = function() {
  var logFile = document.querySelector('.filepath').files[0];
  if (!logFile) { return alert('Please select a log file.'); }
  trackLog(logFile.path);
};

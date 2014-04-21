var win = gui.Window.get();

var require = node;

var fs = require('fs');
var LogTracker    = require('log-tracker');
var LogFormatter  = require('log-formatter');

window.openFile = function() {
  var body    = document.querySelector('body');
  var logArea = document.querySelector('.js-log-area');
  logArea.innerHTML = '';

  var logFile = document.querySelector('.filepath').files[0];
  if (!logFile) { alert('Please select a log file.'); }
  var logTracker = new LogTracker(logFile.path);
  logTracker.on("data", function (data) {
    var html = new LogFormatter(data).toHtml();
    logArea.innerHTML = logArea.innerHTML + html;
    body.scrollTop = body.scrollHeight;
  });
};

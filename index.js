var win = gui.Window.get();

var require = node;

var fs = require('fs');
var LogTracker    = require('log-tracker');
var LogFormatter  = require('log-formatter');

window.openFile = function() {
  var body    = document.querySelector('body');
  var logArea = document.querySelector('.js-log-area');
  logArea.innerHTML = '';

  var logPath = document.querySelector('.filepath').getAttribute('value');
  var logTracker = new LogTracker(logPath);
  logTracker.on("data", function (data) {
    var html = new LogFormatter(data).toHtml();
    logArea.innerHTML = logArea.innerHTML + html;
    body.scrollTop = body.scrollHeight;
  });
};

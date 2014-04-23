var win = gui.Window.get();

var require = node;

var fs = require('fs');
var LogTracker    = require('log-tracker');
var LogFormatter  = require('log-formatter');

var database = require('database');

var fetchLogs = function(onSuccess) {
  var logs = [];
  var store = database.db.transaction("log_files").objectStore("log_files");
  store.openCursor().onsuccess = function(event) {
    var cursor = event.target.result;
    if (cursor) {
      logs.push(cursor.value);
      cursor.continue();
    } else {
      onSuccess(logs);
    }
  };
};

database.onDbReady = function() {
  var logs = fetchLogs(function(logs) {
    console.log("All stored logs:", logs);
  });
};


var storeLogFile = function(filepath) {
  var transaction = database.db.transaction(["log_files"], "readwrite");
  var store = transaction.objectStore("log_files");

  var request = store.add({path: filepath});
  request.onsuccess = function(event) {
    console.log("Saved log: " + filepath);
  };

  transaction.onerror = function(event) {
    alert("Couldn't store log file path ...");
  };
};

var trackLog = function(filepath) {
  storeLogFile(filepath);
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

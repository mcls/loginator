var database = require('database');

exports.newTransaction = function(mode) {
  if (mode) {
    return database.db.transaction(["log_files"], mode);
  } else {
    return database.db.transaction("log_files");
  }
};

exports.add = function(filepath) {
  var transaction = exports.newTransaction("readwrite");
  var store = transaction.objectStore("log_files");

  var request = store.add({path: filepath});
  request.onsuccess = function(event) {
    console.log("Saved log: " + filepath);
  };

  transaction.onerror = function(event) {
    alert("Couldn't store log file path ...");
  };
};

exports.findAll = function(onSuccess) {
  var logs = [];
  var store = exports.newTransaction().objectStore("log_files");
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

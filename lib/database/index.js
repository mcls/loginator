if (!window.indexedDB) {
  window.alert("ERROR: No support for IndexedDB.");
}

var dbRequest = window.indexedDB.open("loginator_db", 1);
exports.onDbReady = function() {};

dbRequest.onerror = function(event) {
  alert("ERROR: Couldn't open IndexedDB database!");
};

dbRequest.onupgradeneeded = function(event) {
  var db = event.target.result;
  var logFiles = db.createObjectStore("log_files", {autoIncrement: true});
  logFiles.createIndex("path", "path", { unique: true });
};

dbRequest.onsuccess = function(event) {
  var db = exports.db = dbRequest.result;
  console.log("Opened db    :", db.name, db.version);
  console.log("ObjectStores :", db.objectStoreNames);

  // Generic error handler for all errors targeted at this database's requests!
  db.onerror = function(event) {
    alert("Database error: " + event.target.errorCode);
  };
  exports.onDbReady();
};

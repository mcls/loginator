var spawn   = node('child_process').spawn;
var Emitter = node('events').EventEmitter;

/**
 * Tail a log file
 *
 * @param {String} filepath
 * @api public
 */

var LogTracker = module.exports = function LogTracker(filepath) {
  this.path = filepath;
  this.tail = spawn("tail", ["-f", this.path]);
  this.tail.stdout.on("data", this.ondata.bind(this));
}

LogTracker.prototype.__proto__ = Emitter.prototype;

LogTracker.prototype.ondata = function(data) {
  this.emit("data", data);
};


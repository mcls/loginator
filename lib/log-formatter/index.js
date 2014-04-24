var ansispan = node('ansispan');

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

var LogFormatter = module.exports = function LogFormatter(content) {
  this.content = String(content);
  this.lines = this.content.split("\n");
}

LogFormatter.prototype.toHtml = function() {
  var html = this.lines.join("</p><p class='code'>");
  html = "<p class='code'>" + html + "</p>";
  return ansispan(html);
};

var Artists = require('./lib/artists');

var Beats = function (options) {
  this.key = options.key;
  this.secret = options.secret;
};

for (var func in Artists.prototype) {
  Beats.prototype[func] = Artists.prototype[func];
}

module.exports = Beats;

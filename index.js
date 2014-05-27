var Activities = require('./lib/activities');
var Albums = require('./lib/albums');
var Artists = require('./lib/artists');
var Genres = require('./lib/genres');
var Highlights = require('./lib/highlights');
var Playlists = require('./lib/playlists');
var Search = require('./lib/search');
var Tracks = require('./lib/tracks');

var Beats = function (options) {
  this.key = options.key;
  this.secret = options.secret;
};

for (var func in Artists.prototype) {
  Beats.prototype[func] = Artists.prototype[func];
}

for (var func in Activities.prototype) {
  Beats.prototype[func] = Activities.prototype[func];
}

for (var func in Albums.prototype) {
  Beats.prototype[func] = Albums.prototype[func];
}

for (var func in Genres.prototype) {
  Beats.prototype[func] = Genres.prototype[func];
}

for (var func in Highlights.prototype) {
  Beats.prototype[func] = Highlights.prototype[func];
}

for (var func in Playlists.prototype) {
  Beats.prototype[func] = Playlists.prototype[func];
}

for (var func in Search.prototype) {
  Beats.prototype[func] = Search.prototype[func];
}

for (var func in Tracks.prototype) {
  Beats.prototype[func] = Tracks.prototype[func];
}

module.exports = Beats;

var Joi = require('joi');
var httpHelper = require('./httpHelper');
var utils = require('./utils');

var Playlists = function (options) {
  this.key = options.key;
  this.secret = options.secret;

  this.validations = {
    collection: {
      ids: Joi.array().includes(Joi.string()),
      offset: Joi.number().integer().default(0).optional(),
      limit: Joi.number().integer().max(200).default(20).optional(),
      order_by: Joi.string().allow(['name asc', 'name desc', 'name', 'created_at asc', 'created_at', 'created_at desc', 'updated_at desc', 'updated_at', 'updated_at asc', 'duration asc', 'duration', 'duration_desc', 'total_tracks asc', 'total_tracks', 'total_tracks desc']).optional()
    },
    playlistById: {
      id: Joi.string().required()
    },
    playlistSubscribers: {
      id: Joi.string().required(),
      offset: Joi.number().integer().default(0).optional(),
      limit: Joi.number().integer().max(200).default(20).optional()
    },
    playlistTracks: {
      id: Joi.string().required(),
      offset: Joi.number().integer().default(0).optional(),
      limit: Joi.number().integer().max(200).default(20).optional(),
      order_by: Joi.string().allow(['popularity', 'title asc', 'title desc', 'title', 'release_date asc', 'release_date', 'original_release_date desc', 'original_release_date']).optional()
    },
    playlistArtists: {
      id: Joi.string().required(),
      offset: Joi.number().integer().default(0).optional(),
      limit: Joi.number().integer().max(200).default(20).optional(),
      order_by: Joi.string().allow(['popularity', 'title asc', 'title desc', 'title', 'release_date asc', 'release_date', 'original_release_date desc', 'original_release_date']).optional()
    }
  };
};

Playlists.prototype.getPlaylists = function (options, cb) {
  var self = this;
  var data = utils.handleParams(options, cb);
  options = data.options;
  cb = data.cb;

  Joi.validate(options, this.validations.collection, function (err) {
    if (err) {
      cb(err);
    } else {
      var params = {
        uri: 'https://partner.api.beatsmusic.com/v1/api/playlists',
        query: options,
        method: 'GET'
      };
      params.query.client_id = self.key;
      httpHelper.makeRequest(params, cb);
    }
  });
};

Playlists.prototype.getPlaylist = function (options, cb) {
  var self = this;
  var data = utils.handleParams(options, cb);
  options = data.options;
  cb = data.cb;

  Joi.validate(options, this.validations.playlistById, function (err) {
    if (err) {
      cb(err);
    } else {
      var params = {
        uri: 'https://partner.api.beatsmusic.com/v1/api/playlists/' + options.id,
        query: options,
        method: 'GET'
      };
      params.query.client_id = self.key;
      httpHelper.makeRequest(params, cb);
    }
  });
};

Playlists.prototype.getPlaylistSubscribers = function (options, cb) {
  var self = this;
  var data = utils.handleParams(options, cb);
  options = data.options;
  cb = data.cb;

  Joi.validate(options, this.validations.playlistSubscribers, function (err) {
    if (err) {
      cb(err);
    } else {
      var params = {
        uri: 'https://partner.api.beatsmusic.com/v1/api/playlists/' + options.id + '/subscribers',
        query: options,
        method: 'GET'
      };
      params.query.client_id = self.key;
      httpHelper.makeRequest(params, cb);
    }
  });
};

Playlists.prototype.getPlaylistTracks = function (options, cb) {
  var self = this;
  var data = utils.handleParams(options, cb);
  options = data.options;
  cb = data.cb;

  Joi.validate(options, this.validations.playlistTracks, function (err) {
    if (err) {
      cb(err);
    } else {
      var params = {
        uri: 'https://partner.api.beatsmusic.com/v1/api/playlists/' + options.id + '/tracks',
        query: options,
        method: 'GET'
      };
      params.query.client_id = self.key;
      httpHelper.makeRequest(params, cb);
    }
  });
};

Playlists.prototype.getPlaylistArtists = function (options, cb) {
  var self = this;
  var data = utils.handleParams(options, cb);
  options = data.options;
  cb = data.cb;

  Joi.validate(options, this.validations.playlistArtists, function (err) {
    if (err) {
      cb(err);
    } else {
      var params = {
        uri: 'https://partner.api.beatsmusic.com/v1/api/playlists/' + options.id + '/artists',
        query: options,
        method: 'GET'
      };
      params.query.client_id = self.key;
      httpHelper.makeRequest(params, cb);
    }
  });
};

module.exports = Playlists;

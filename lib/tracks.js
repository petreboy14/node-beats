var Joi = require('joi');
var httpHelper = require('./httpHelper');
var utils = require('./utils');

var Tracks = function (options) {
  this.key = options.key;
  this.secret = options.secret;

  this.validations = {
    collection: {
      offset: Joi.number().integer().default(0).optional(),
      limit: Joi.number().integer().max(200).default(20).optional(),
      fields: Joi.array().includes(Joi.string()),
      refs: Joi.array().includes(Joi.string()),
      order_by: Joi.string().allow(['name asc', 'name desc', 'name', 'created_at asc', 'created_at', 'created_at desc', 'updated_at desc', 'updated_at', 'updated_at asc', 'duration asc', 'duration', 'duration_desc', 'total_tracks asc', 'total_tracks', 'total_tracks desc']).optional(),
      ids: Joi.array().includes(Joi.string())
    },
    trackById: {
      id: Joi.string().required()
    },
    trackArtists: {
      id: Joi.string().required(),
      offset: Joi.number().integer().default(0).optional(),
      limit: Joi.number().integer().max(200).default(20).optional(),
      fields: Joi.array().includes(Joi.string()),
      refs: Joi.array().includes(Joi.string()),
      order_by: Joi.string().allow(['popularity desc', 'popularity', 'name asc', 'name', 'name desc'])
    }
  };
};

Tracks.prototype.getTracks = function (options, cb) {
  var self = this;
  var data = utils.handleParams(options, cb);
  options = data.options;
  cb = data.cb;

  Joi.validate(options, this.validations.collection, function (err) {
    if (err) {
      cb(err);
    } else {
      var params = {
        uri: 'https://partner.api.beatsmusic.com/v1/api/tracks',
        query: options,
        method: 'GET'
      };
      params.query.client_id = self.key;
      httpHelper.makeRequest(params, cb);
    }
  });
};

Tracks.prototype.getTrackById = function (options, cb) {
  var self = this;
  var data = utils.handleParams(options, cb);
  options = data.options;
  cb = data.cb;

  Joi.validate(options, this.validations.trackById, function (err) {
    if (err) {
      cb(err);
    } else {
      var params = {
        uri: 'https://partner.api.beatsmusic.com/v1/api/tracks/' + options.id,
        query: options,
        method: 'GET'
      };
      params.query.client_id = self.key;
      httpHelper.makeRequest(params, cb);
    }
  });
};


Tracks.prototype.getTrackArtists = function (options, cb) {
  var self = this;
  var data = utils.handleParams(options, cb);
  options = data.options;
  cb = data.cb;

  Joi.validate(options, this.validations.trackArtists, function (err) {
    if (err) {
      cb(err);
    } else {
      var params = {
        uri: 'https://partner.api.beatsmusic.com/v1/api/tracks/' + options.id + '/artists',
        query: options,
        method: 'GET'
      };
      params.query.client_id = self.key;
      httpHelper.makeRequest(params, cb);
    }
  });
};

module.exports = Tracks;

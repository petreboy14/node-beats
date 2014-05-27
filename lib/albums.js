var Joi = require('joi');
var httpHelper = require('./httpHelper');
var utils = require('./utils');

var Albums = function (options) {
  this.key = options.key;
  this.secret = options.secret;

  this.validations = {
    collection: {
      order_by: Joi.string().allow(['popularity desc', 'popularity', 'title asc', 'title desc', 'title', 'release_date asc', 'release_date', 'release_date desc']).optional(),
      offset: Joi.number().integer().default(0).optional(),
      limit: Joi.number().integer().max(200).default(20).optional(),
      filters: Joi.array().includes(Joi.string()),
      streamability: Joi.boolean(),
      ids: Joi.array().optional()
    },
    albumById: {
      id: Joi.string().required(),
      fields: Joi.array().includes(Joi.string())
    },
    albumArtists: {
      id: Joi.string().required(),
      offset: Joi.number().integer().default(0).optional(),
      limit: Joi.number().integer().max(200).default(20).optional(),
      fields: Joi.array().includes(Joi.string()),
      refs: Joi.array().includes(Joi.string()),
      order_by: Joi.string().allow(['popularity desc', 'popularity', 'name asc', 'name', 'name desc']),
      ids: Joi.array().includes(Joi.string()).optional()
    },
    albumTracks: {
      id: Joi.string().required(),
      offset: Joi.number().integer().default(0).optional(),
      limit: Joi.number().integer().max(200).default(20).optional(),
      fields: Joi.array().includes(Joi.string()),
      refs: Joi.array().includes(Joi.string()),
      order_by: Joi.string().allow(['track_position', 'popularity desc', 'popularity', 'name asc', 'name', 'name desc']),
    },
    albumReviews: {
      id: Joi.string().required()
    },
    albumCompanions: {
      id: Joi.string().required(),
      filters: Joi.array().includes(Joi.string())
    }
  };
};

Albums.prototype.getAlbums = function (options, cb) {
  var self = this;
  var data = utils.handleParams(options, cb);
  options = data.options;
  cb = data.cb;

  Joi.validate(options, this.validations.collection, function (err) {
    if (err) {
      cb(err);
    } else {
      var params = {
        uri: 'https://partner.api.beatsmusic.com/v1/api/albums',
        query: options,
        method: 'GET'
      };
      params.query.client_id = self.key;
      httpHelper.makeRequest(params, cb);
    }
  });
};

Albums.prototype.getAlbumById = function (options, cb) {
  var self = this;
  var data = utils.handleParams(options, cb);
  options = data.options;
  cb = data.cb;

  Joi.validate(options, this.validations.albumById, function (err) {
    if (err) {
      cb(err);
    } else {
      var params = {
        uri: 'https://partner.api.beatsmusic.com/v1/api/albums/' + options.id,
        query: {
          client_id: self.key
        },
        method: 'GET'
      };
      httpHelper.makeRequest(params, cb);
    }
  });
};

Albums.prototype.getAlbumArtists = function (options, cb) {
  var self = this;
  var data = utils.handleParams(options, cb);
  options = data.options;
  cb = data.cb;

  Joi.validate(options, this.validations.albumArtists, function (err) {
    if (err) {
      cb(err);
    } else {
      var params = {
        uri: 'https://partner.api.beatsmusic.com/v1/api/albums/' + options.id + '/artists',
        query: {
          client_id: self.key
        },
        method: 'GET'
      };
      httpHelper.makeRequest(params, cb);
    }
  });
};

Albums.prototype.getAlbumTracks = function (options, cb) {
  var self = this;
  var data = utils.handleParams(options, cb);
  options = data.options;
  cb = data.cb;

  Joi.validate(options, this.validations.albumTracks, function (err) {
    if (err) {
      cb(err);
    } else {
      var params = {
        uri: 'https://partner.api.beatsmusic.com/v1/api/albums/' + options.id + '/tracks',
        query: {
          client_id: self.key
        },
        method: 'GET'
      };
      httpHelper.makeRequest(params, cb);
    }
  });
};

Albums.prototype.getAlbumReview = function (options, cb) {
  var self = this;
  var data = utils.handleParams(options, cb);
  options = data.options;
  cb = data.cb;

  Joi.validate(options, this.validations.albumReviews, function (err) {
    if (err) {
      cb(err);
    } else {
      var params = {
        uri: 'https://partner.api.beatsmusic.com/v1/api/albums/' + options.id + '/review',
        query: {
          client_id: self.key
        },
        method: 'GET'
      };
      httpHelper.makeRequest(params, cb);
    }
  });
};

Albums.prototype.getAlbumCompanionAlbums = function (options, cb) {
  var self = this;
  var data = utils.handleParams(options, cb);
  options = data.options;
  cb = data.cb;

  Joi.validate(options, this.validations.albumCompanions, function (err) {
    if (err) {
      cb(err);
    } else {
      var params = {
        uri: 'https://partner.api.beatsmusic.com/v1/api/albums/' + options.id + '/companion_albums',
        query: {
          client_id: self.key
        },
        method: 'GET'
      };
      httpHelper.makeRequest(params, cb);
    }
  });
};

module.exports = Albums;

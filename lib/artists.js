var Joi = require('joi');
var httpHelper = require('./httpHelper');
var utils = require('./utils');

var Artists = function (options) {
  this.key = options.key;
  this.secret = options.secret;

  this.validations = {
    collection: {
      order_by: Joi.string().allow(['popularity desc', 'popularity', 'name asc', 'name desc', 'name']).optional(),
      offset: Joi.number().integer().default(0).optional(),
      limit: Joi.number().integer().max(200).default(20).optional(),
      ids: Joi.array().optional(),
      fields: Joi.array().optional()
    },
    artistById: {
      id: Joi.string().regex(/^ar[0-9]*$/).required(),
      fields: Joi.array().optional(),
      refs: Joi.array().optional()
    },
    artistAlbums: {
      id: Joi.string().regex(/^ar[0-9]*$/).required(),
      fields: Joi.array().optional(),
      offset: Joi.number().integer().default(0).optional(),
      limit: Joi.number().integer().max(200).default(20).optional(),
      refs: Joi.array().optional()
    },
    essentialAlbums: {
      id: Joi.string().regex(/^ar[0-9]*$/).required()
    },
    artistTracks: {
      id: Joi.string().regex(/^ar[0-9]*$/).required(),
      fields: Joi.array().optional(),
      offset: Joi.number().integer().default(0).optional(),
      limit: Joi.number().integer().max(200).default(20).optional(),
      refs: Joi.array().optional(),
      order_by: Joi.string().allow(['popularity desc', 'popularity', 'title asc', 'title', 'title desc', 'release_date asc', 'release_date', 'original_release_date', 'release_date']).optional(),
      filters: Joi.array().includes(Joi.string()).optional()
    },
    artistPlaylists: {
      id: Joi.string().regex(/^ar[0-9]*$/).required(),
      fields: Joi.array().optional(),
      offset: Joi.number().integer().default(0).optional(),
      limit: Joi.number().integer().max(200).default(20).optional(),
      refs: Joi.array().optional()
    },
    artistEditorialPlaylists: {
      id: Joi.string().regex(/^ar[0-9]*$/).required(),
      fields: Joi.array().optional(),
      offset: Joi.number().integer().default(0).optional(),
      limit: Joi.number().integer().max(200).default(20).optional(),
      refs: Joi.array().optional()
    },
    artistBios: {
      id: Joi.string().regex(/^ar[0-9]*$/).required(),
      fields: Joi.array().optional(),
      offset: Joi.number().integer().default(0).optional(),
      limit: Joi.number().integer().max(200).default(20).optional(),
      refs: Joi.array().optional()
    }
  };
};

Artists.prototype.getArtistCollection = function (options, cb) {
  var self = this;
  var data = utils.handleParams(options, cb);
  options = data.options;
  cb = data.cb;

  Joi.validate(options, this.validations.collection, function (err) {
    if (err) {
      cb(err);
    } else {
      var params = {
        uri: 'https://partner.api.beatsmusic.com/v1/api/artists',
        query: options,
        method: 'GET'
      };
      params.query.client_id = self.key;
      httpHelper.makeRequest(params, cb);
    }
  });
};

Artists.prototype.getArtistById = function (options, cb) {
  var self = this;
  var data = utils.handleParams(options, cb);
  options = data.options;
  cb = data.cb;

  Joi.validate(options, this.validations.artistById, function (err) {
    if (err) {
      cb(err);
    } else {
      var params = {
        uri: 'https://partner.api.beatsmusic.com/v1/api/artists/' + options.id,
        query: {
          client_id: self.key
        },
        method: 'GET'
      };
      httpHelper.makeRequest(params, cb);
    }
  });
};

Artists.prototype.getArtistAlbums = function (options, cb) {
  var self = this;
  var data = utils.handleParams(options, cb);
  options = data.options;
  cb = data.cb;

  Joi.validate(options, this.validations.artistAlbums, function (err) {
    if (err) {
      cb(err);
    } else {
      var params = {
        uri: 'https://partner.api.beatsmusic.com/v1/api/artists/' + options.id + '/albums',
        query: options,
        method: 'GET'
      };
      params.query.client_id = self.key;
      httpHelper.makeRequest(params, cb);
    }
  });
};

Artists.prototype.getArtistEssentialAlbums = function (options, cb) {
  var self = this;
  var data = utils.handleParams(options, cb);
  options = data.options;
  cb = data.cb;

  Joi.validate(options, this.validations.artistAlbums, function (err) {
    if (err) {
      cb(err);
    } else {
      var params = {
        uri: 'https://partner.api.beatsmusic.com/v1/api/artists/' + options.id + '/essential_albums',
        query: options,
        method: 'GET'
      };
      params.query.client_id = self.key;
      httpHelper.makeRequest(params, cb);
    }
  });
};

Artists.prototype.getArtistTracks = function (options, cb) {
  var self = this;
  var data = utils.handleParams(options, cb);
  options = data.options;
  cb = data.cb;

  Joi.validate(options, this.validations.artistTracks, function (err) {
    if (err) {
      cb(err);
    } else {
      var params = {
        uri: 'https://partner.api.beatsmusic.com/v1/api/artists/' + options.id + '/tracks',
        query: options,
        method: 'GET'
      };
      params.query.client_id = self.key;
      httpHelper.makeRequest(params, cb);
    }
  });
};

Artists.prototype.getArtistPlaylists = function (options, cb) {
  var self = this;
  var data = utils.handleParams(options, cb);
  options = data.options;
  cb = data.cb;

  Joi.validate(options, this.validations.artistPlaylists, function (err) {
    if (err) {
      cb(err);
    } else {
      var params = {
        uri: 'https://partner.api.beatsmusic.com/v1/api/artists/' + options.id + '/playlists',
        query: options,
        method: 'GET'
      };
      params.query.client_id = self.key;
      httpHelper.makeRequest(params, cb);
    }
  });
};

Artists.prototype.getArtistEditorialPlaylists = function (options, cb) {
  var self = this;
  var data = utils.handleParams(options, cb);
  options = data.options;
  cb = data.cb;

  Joi.validate(options, this.validations.artistEditorialPlaylists, function (err) {
    if (err) {
      cb(err);
    } else {
      var params = {
        uri: 'https://partner.api.beatsmusic.com/v1/api/artists/' + options.id + '/editorial_playlists',
        query: options,
        method: 'GET'
      };
      params.query.client_id = self.key;
      httpHelper.makeRequest(params, cb);
    }
  });
};

Artists.prototype.getArtistBios = function (options, cb) {
  var self = this;
  var data = utils.handleParams(options, cb);
  options = data.options;
  cb = data.cb;

  Joi.validate(options, this.validations.artistBios, function (err) {
    if (err) {
      cb(err);
    } else {
      var params = {
        uri: 'https://partner.api.beatsmusic.com/v1/api/artists/' + options.id + '/bios',
        query: options,
        method: 'GET'
      };
      params.query.client_id = self.key;
      httpHelper.makeRequest(params, cb);
    }
  });
};

module.exports = Artists;

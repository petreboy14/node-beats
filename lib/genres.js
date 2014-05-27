var Joi = require('joi');
var httpHelper = require('./httpHelper');
var utils = require('./utils');

var Genres = function (options) {
  this.key = options.key;
  this.secret = options.secret;

  this.validations = {
    collection: {
      offset: Joi.number().integer().default(0).optional(),
      limit: Joi.number().integer().max(200).default(20).optional()
    },
    genreById: {
      id: Joi.string().required()
    },
    genreEditorPicks: {
      id: Joi.string().required(),
      offset: Joi.number().integer().default(0).optional(),
      limit: Joi.number().integer().max(200).default(20).optional()
    },
    genreFeatured: {
      id: Joi.string().required(),
      offset: Joi.number().integer().default(0).optional(),
      limit: Joi.number().integer().max(200).default(20).optional()
    },
    genreNewReleases: {
      id: Joi.string().required(),
      offset: Joi.number().integer().default(0).optional(),
      limit: Joi.number().integer().max(200).default(20).optional()
    },
    genreBios: {
      id: Joi.string().required(),
      offset: Joi.number().integer().default(0).optional(),
      limit: Joi.number().integer().max(200).default(20).optional()
    },
    genrePlaylists: {
      id: Joi.string().required(),
      offset: Joi.number().integer().default(0).optional(),
      limit: Joi.number().integer().max(200).default(20).optional(),
      order_by: Joi.string().allow(['name asc', 'name desc', 'name', 'created_at asc', 'created_at', 'created_at desc', 'updated_at desc', 'updated_at', 'updated_at asc', 'duration asc', 'duration', 'duration_desc', 'total_tracks asc', 'total_tracks', 'total_tracks desc']).optional(),
    }
  };
};

Genres.prototype.getGenres = function (options, cb) {
  var self = this;
  var data = utils.handleParams(options, cb);
  options = data.options;
  cb = data.cb;

  Joi.validate(options, this.validations.genreById, function (err) {
    if (err) {
      cb(err);
    } else {
      var params = {
        uri: 'https://partner.api.beatsmusic.com/v1/api/genres',
        query: options,
        method: 'GET'
      };
      params.query.client_id = self.key;
      httpHelper.makeRequest(params, cb);
    }
  });
};

Genres.prototype.getGenre = function (options, cb) {
  var self = this;
  var data = utils.handleParams(options, cb);
  options = data.options;
  cb = data.cb;

  Joi.validate(options, this.validations.collection, function (err) {
    if (err) {
      cb(err);
    } else {
      var params = {
        uri: 'https://partner.api.beatsmusic.com/v1/api/genres/' + options.id,
        query: options,
        method: 'GET'
      };
      params.query.client_id = self.key;
      httpHelper.makeRequest(params, cb);
    }
  });
};

Genres.prototype.getGenreEditorPicks = function (options, cb) {
  var self = this;
  var data = utils.handleParams(options, cb);
  options = data.options;
  cb = data.cb;

  Joi.validate(options, this.validations.genreEditorPicks, function (err) {
    if (err) {
      cb(err);
    } else {
      var params = {
        uri: 'https://partner.api.beatsmusic.com/v1/api/genres/' + options.id + '/editors_picks',
        query: options,
        method: 'GET'
      };
      params.query.client_id = self.key;
      httpHelper.makeRequest(params, cb);
    }
  });
};

Genres.prototype.getGenreFeatured = function (options, cb) {
  var self = this;
  var data = utils.handleParams(options, cb);
  options = data.options;
  cb = data.cb;

  Joi.validate(options, this.validations.genreFeatured, function (err) {
    if (err) {
      cb(err);
    } else {
      var params = {
        uri: 'https://partner.api.beatsmusic.com/v1/api/genres/' + options.id + '/featured',
        query: options,
        method: 'GET'
      };
      params.query.client_id = self.key;
      httpHelper.makeRequest(params, cb);
    }
  });
};

Genres.prototype.getGenreNewReleases = function (options, cb) {
  var self = this;
  var data = utils.handleParams(options, cb);
  options = data.options;
  cb = data.cb;

  Joi.validate(options, this.validations.genreNewReleases, function (err) {
    if (err) {
      cb(err);
    } else {
      var params = {
        uri: 'https://partner.api.beatsmusic.com/v1/api/genres/' + options.id + '/new_releases',
        query: options,
        method: 'GET'
      };
      params.query.client_id = self.key;
      httpHelper.makeRequest(params, cb);
    }
  });
};

Genres.prototype.getGenreBios = function (options, cb) {
  var self = this;
  var data = utils.handleParams(options, cb);
  options = data.options;
  cb = data.cb;

  Joi.validate(options, this.validations.genreBios, function (err) {
    if (err) {
      cb(err);
    } else {
      var params = {
        uri: 'https://partner.api.beatsmusic.com/v1/api/genres/' + options.id + '/bios',
        query: options,
        method: 'GET'
      };
      params.query.client_id = self.key;
      httpHelper.makeRequest(params, cb);
    }
  });
};

Genres.prototype.getGenrePlaylists = function (options, cb) {
  var self = this;
  var data = utils.handleParams(options, cb);
  options = data.options;
  cb = data.cb;

  Joi.validate(options, this.validations.genrePlaylists, function (err) {
    if (err) {
      cb(err);
    } else {
      var params = {
        uri: 'https://partner.api.beatsmusic.com/v1/api/genres/' + options.id + '/playlists',
        query: options,
        method: 'GET'
      };
      params.query.client_id = self.key;
      httpHelper.makeRequest(params, cb);
    }
  });
};

module.exports = Genres;

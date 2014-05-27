var Joi = require('joi');
var httpHelper = require('./httpHelper');
var utils = require('./utils');

var Search = function (options) {
  this.key = options.key;
  this.secret = options.secret;

  this.validations = {
    search: {
      q: Joi.string().min(2).required(),
      type: Joi.string().valid(['genre', 'artist', 'album', 'track', 'playlist', 'user']).required(),
      offset: Joi.number().integer().default(0).optional(),
      limit: Joi.number().integer().max(200).default(20).optional()
    },
    federated: {
      q: Joi.string().min(2).required()
    },
    predictive: {
      q: Joi.string().min(2).required(),
      type: Joi.string().valid(['artist', 'genre']).optional()
    }
  };
};

Search.prototype.search = function (options, cb) {
  var self = this;
  var data = utils.handleParams(options, cb);
  options = data.options;
  cb = data.cb;

  Joi.validate(options, this.validations.search, function (err) {
    if (err) {
      cb(err);
    } else {
      var params = {
        uri: 'https://partner.api.beatsmusic.com/v1/api/search',
        query: options,
        method: 'GET'
      };
      params.query.client_id = self.key;
      httpHelper.makeRequest(params, cb);
    }
  });
};

Search.prototype.federatedSearch = function (options, cb) {
  var self = this;
  var data = utils.handleParams(options, cb);
  options = data.options;
  cb = data.cb;

  Joi.validate(options, this.validations.federated, function (err) {
    if (err) {
      cb(err);
    } else {
      var params = {
        uri: 'https://partner.api.beatsmusic.com/v1/api/search/federated',
        query: options,
        method: 'GET'
      };
      params.query.client_id = self.key;
      httpHelper.makeRequest(params, cb);
    }
  });
};

Search.prototype.predictiveSearch = function (options, cb) {
  var self = this;
  var data = utils.handleParams(options, cb);
  options = data.options;
  cb = data.cb;

  Joi.validate(options, this.validations.federated, function (err) {
    if (err) {
      cb(err);
    } else {
      var params = {
        uri: 'https://partner.api.beatsmusic.com/v1/api/search/predictive',
        query: options,
        method: 'GET'
      };
      params.query.client_id = self.key;
      httpHelper.makeRequest(params, cb);
    }
  });
};

module.exports = Search;

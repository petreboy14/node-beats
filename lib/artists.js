var Joi = require('joi');
var httpHelper = require('./httpHelper');

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
    }
  };
};

Artists.prototype.getArtistCollection = function (options, cb) {
  var self = this;

  if (typeof(options) === 'function') {
    cb = options;
    options = {};
  } else if (options === null) {
    options = {};
  }

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

module.exports = Artists;

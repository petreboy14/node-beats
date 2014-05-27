var Joi = require('joi');
var httpHelper = require('./httpHelper');
var utils = require('./utils');

var Highlights = function (options) {
  this.key = options.key;
  this.secret = options.secret;

  this.validations = {
    featured: {

    },
    editorPicks: {

    }
  };
};

Highlights.prototype.getFeatured = function (options, cb) {
  var self = this;
  var data = utils.handleParams(options, cb);
  options = data.options;
  cb = data.cb;

  Joi.validate(options, this.validations.featured, function (err) {
    if (err) {
      cb(err);
    } else {
      var params = {
        uri: 'https://partner.api.beatsmusic.com/v1/api/discoveries/featured',
        query: options,
        method: 'GET'
      };
      params.query.client_id = self.key;
      httpHelper.makeRequest(params, cb);
    }
  });
};

Highlights.prototype.getEditorPicks = function (options, cb) {
  var self = this;
  var data = utils.handleParams(options, cb);
  options = data.options;
  cb = data.cb;

  Joi.validate(options, this.validations.editorPicks, function (err) {
    if (err) {
      cb(err);
    } else {
      var params = {
        uri: 'https://partner.api.beatsmusic.com/v1/api/discoveries/editor_picks',
        query: options,
        method: 'GET'
      };
      params.query.client_id = self.key;
      httpHelper.makeRequest(params, cb);
    }
  });
};

module.exports = Highlights;

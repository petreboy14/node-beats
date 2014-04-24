var Joi = require('joi');
var httpHelper = require('./httpHelper');
var utils = require('./utils');

var Activities = function (options) {
  this.key = options.key;
  this.secret = options.secret;

  this.validations = {
    activities: {}
  };
};

Activities.prototype.getActivities = function (options, cb) {
  var self = this;
  var data = utils.handleParams(options, cb);
  options = data.options;
  cb = data.cb;

  Joi.validate(options, this.validations.activities, function (err) {
    if (err) {
      cb(err);
    } else {
      var params = {
        uri: 'https://partner.api.beatsmusic.com/v1/api/activities',
        query: options,
        method: 'GET'
      };
      params.query.client_id = self.key;
      httpHelper.makeRequest(params, cb);
    }
  });
};

module.exports = Activities;

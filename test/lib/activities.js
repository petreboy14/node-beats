var Lab = require('lab');
var should = require('should');

var describe = Lab.experiment;
var it = Lab.test;
var expect = Lab.expect;
var before = Lab.before;
var after = Lab.after;

var key = require('../../test-key.json');
var Activities = require('../../lib/activities');
var activities = null;

describe('Activities tests', function () {
  it('should be able to create an instance of Activities', function (done) {
    activities = new Activities(key);
    done();
  });

  describe('#getActivities tests', { timeout: 20000 }, function () {
    it('should be able to get a collection of activities with no params', function (done) {
      activities.getActivities(function (err, data) {
        should.not.exist(err);
        should.exist(data);
        data.should.have.keys(['data', 'info', 'code']);
        data.data.should.be.an.instanceOf(Array);
        done();
      });
    });

    it('should fail trying to get activities with any param', function (done) {
      activities.getActivities({foo: 'bar'}, function (err) {
        should.exist(err);
        done();
      });
    });
  });
});

var Lab = require('lab');

var describe = Lab.experiment;
var it = Lab.test;
var expect = Lab.expect;
var before = Lab.before;
var after = Lab.after;

var should = require('should');

var httpHelper = require('../../lib/httpHelper');
describe('httpHelper tests', function () {

  it('should get an error if a bad url is given', function (done) {
    var options = {
      uri: 'asdkdjskdjksjkdjksjdk'
    };

    httpHelper.makeRequest(options, function (err) {
      should.exist(err);
      done();
    });
  });

  it('should be able to do a simple GET', { timeout: 20000 }, function (done) {
    var options = {
      uri: 'http://httpbin.org/get',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    httpHelper.makeRequest(options, function (err, data) {
      should.not.exist(err);
      should.exist(data);
      data.should.be.an.instanceOf(Object);
      data.should.have.keys('origin', 'args', 'url', 'headers');
      done();
    });
  });

  it('should be able to do a GET with query parms', { timeout: 20000 }, function (done) {
    var options = {
      uri: 'http://httpbin.org/get',
      query: {
        foo: 'bar'
      },
      headers: {
        'Content-Type': 'application/json'
      }
    };

    httpHelper.makeRequest(options, function (err, data) {
      should.not.exist(err);
      should.exist(data);
      data.should.be.an.instanceOf(Object);
      data.args.should.have.keys('foo');
      data.args.foo.should.equal('bar');
      data.should.have.keys('origin', 'args', 'url', 'headers');
      done();
    });
  });

  it('should be able to do a simple POST stringifying object', { timeout: 20000 }, function (done) {
    var options = {
      uri: 'http://httpbin.org/post',
      method: 'POST',
      data: { hey: 'there' },
      headers: {
        'Content-Type': 'application/json'
      }
    };

    httpHelper.makeRequest(options, function (err, data) {
      should.not.exist(err);
      should.exist(data);
      data = JSON.parse(data.data);
      data.should.be.an.instanceOf(Object);
      data.should.have.keys('hey');
      data.hey.should.equal('there');
      done();
    });
  });

  it('should be handle a bad request', { timeout: 20000 }, function (done) {
    var options = {
      uri: 'http://httpbin.org/status/418',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    httpHelper.makeRequest(options, function (err, data) {
      should.exist(err);
      err.statusCode.should.equal(418);
      done();
    });
  });

  it('should be able to do a simple POST with a stringified object', { timeout: 20000 }, function (done) {
    var options = {
      uri: 'http://httpbin.org/post',
      method: 'POST',
      data: JSON.stringify({ hey: 'there' }),
      headers: {
        'Content-Type': 'application/json'
      }
    };

    httpHelper.makeRequest(options, function (err, data) {
      should.not.exist(err);
      should.exist(data.data);
      data = JSON.parse(data.data);
      data.should.be.an.instanceOf(Object);
      data.should.have.keys('hey');
      data.hey.should.equal('there');
      done();
    });
  });
});

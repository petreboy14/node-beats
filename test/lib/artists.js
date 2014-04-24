var Lab = require('lab');
var should = require('should');

var describe = Lab.experiment;
var it = Lab.test;
var expect = Lab.expect;
var before = Lab.before;
var after = Lab.after;

var key = require('../../test-key.json');
var Artists = require('../../lib/artists');
var artists = null;

describe('Artist tests', function () {
  it('should be able to create an instance of Artists', function (done) {
    artists = new Artists(key);
    done();
  });

  describe('#getArtistCollection tests', { timeout: 20000 }, function () {
    it('should be able to get a collection of artists with no params', function (done) {
      artists.getArtistCollection(function (err, data) {
        should.not.exist(err);
        should.exist(data);
        data.should.have.keys(['data', 'info', 'code']);
        data.data.should.be.an.instanceOf(Array);
        done();
      });
    });

    it('should be able to get a collection with valid params', function (done) {
      artists.getArtistCollection({ limit: 5 }, function (err, data) {
        should.not.exist(err);
        should.exist(data);
        data.should.have.keys(['data', 'info', 'code']);
        data.data.should.be.an.instanceOf(Array);
        data.data.length.should.equal(5);
        done();
      });
    });

    it('should return an error for bad params', function (done) {
      artists.getArtistCollection({ limit: 5000 }, function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to handle a null options', function (done) {
      artists.getArtistCollection(null, function (err, data) {
        should.not.exist(err);
        should.exist(data);
        data.should.have.keys(['data', 'info', 'code']);
        data.data.should.be.an.instanceOf(Array);
        done();
      });
    });
  });
});
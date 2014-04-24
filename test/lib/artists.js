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

  describe('#getArtistById tests', { timeout: 5000 }, function () {
    it('should be able to get an artist by id', function (done) {
      artists.getArtistById({ id: 'ar9966' }, function (err, artist) {
        should.not.exist(err);
        should.exist(artist);
        should.exist(artist.data);
        done();
      });
    });

    it('should give an error when a bad id is given', function (done) {
      artists.getArtistById({id: 'sdasdad'}, function (err, artist) {
        should.exist(err);
        done();
      });
    });
  });

  describe('#getArtistAlbums tests', { timeout: 5000 }, function () {
    it('should be able to get an artists albums', function (done) {
      artists.getArtistAlbums({ id: 'ar9966', limit: 5 }, function (err, albums) {
        should.not.exist(err);
        should.exist(albums);
        should.exist(albums.data);
        albums.should.have.keys(['data', 'info', 'code']);
        done();
      });
    });

    it('should give an error when a bad id is given', function (done) {
      artists.getArtistAlbums({id: 'sdasdad'}, function (err, artist) {
        should.exist(err);
        done();
      });
    });
  });

  describe('#getArtistEssentialAlbums tests', { timeout: 5000 }, function () {
    it('should be able to get an artists albums', function (done) {
      artists.getArtistEssentialAlbums({ id: 'ar9966' }, function (err, albums) {
        should.not.exist(err);
        should.exist(albums);
        should.exist(albums.data);
        albums.should.have.keys(['data', 'info', 'code']);
        done();
      });
    });

    it('should give an error when a bad id is given', function (done) {
      artists.getArtistEssentialAlbums({id: 'sdasdad'}, function (err, artist) {
        should.exist(err);
        done();
      });
    });
  });

  describe('#getArtistTracks tests', { timeout: 5000 }, function () {
    it('should be able to get an artists tracks', function (done) {
      artists.getArtistTracks({ id: 'ar9966' }, function (err, albums) {
        should.not.exist(err);
        should.exist(albums);
        should.exist(albums.data);
        albums.should.have.keys(['data', 'info', 'code']);
        done();
      });
    });

    it('should give an error when a bad id is given', function (done) {
      artists.getArtistTracks({id: 'sdasdad'}, function (err, artist) {
        should.exist(err);
        done();
      });
    });
  });

  describe('#getArtistPlaylists tests', { timeout: 5000 }, function () {
    it('should be able to get an artists playlists', function (done) {
      artists.getArtistPlaylists({ id: 'ar9966' }, function (err, albums) {
        should.not.exist(err);
        should.exist(albums);
        should.exist(albums.data);
        albums.should.have.keys(['data', 'info', 'code']);
        done();
      });
    });

    it('should give an error when a bad id is given', function (done) {
      artists.getArtistPlaylists({id: 'sdasdad'}, function (err, artist) {
        should.exist(err);
        done();
      });
    });
  });

  describe('#getArtistEditorialPlaylists tests', { timeout: 5000 }, function () {
    it('should be able to get an artists tracks', function (done) {
      artists.getArtistEditorialPlaylists({ id: 'ar9966' }, function (err, albums) {
        should.not.exist(err);
        should.exist(albums);
        should.exist(albums.data);
        albums.should.have.keys(['data', 'info', 'code']);
        done();
      });
    });

    it('should give an error when a bad id is given', function (done) {
      artists.getArtistEditorialPlaylists({id: 'sdasdad'}, function (err, artist) {
        should.exist(err);
        done();
      });
    });
  });

  describe('#getArtistBios tests', { timeout: 5000 }, function () {
    it('should be able to get an artists tracks', function (done) {
      artists.getArtistBios({ id: 'ar9966' }, function (err, albums) {
        should.not.exist(err);
        should.exist(albums);
        should.exist(albums.data);
        albums.should.have.keys(['data', 'info', 'code']);
        done();
      });
    });

    it('should give an error when a bad id is given', function (done) {
      artists.getArtistBios({id: 'sdasdad'}, function (err, artist) {
        should.exist(err);
        done();
      });
    });
  });
});

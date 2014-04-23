var hyperquest = require('hyperquest');

function makeRequest(options, cb) {
  var data = '';
  var statusCode = null;

  var uri = options.uri;
  var query = options.query;
  var body = options.data;
  var method = options.method;
  var headers = options.headers;

  var requestOptions = {
    method: method || 'GET'
  };

  if (headers) {
    requestOptions.headers = headers;
  } else {
    requestOptions.headers = {};
  }

  if (body) {
    if (typeof(body) === 'object') {
      body = JSON.stringify(body);
    }
    requestOptions.headers['Content-Type'] = 'application/json';
    requestOptions.headers['Content-Length'] = body.length;
  }

  if (query) {
    uri += '?';
    for (var item in query) {
      uri += item + '=' + encodeURIComponent(query[item]) + '&';
    }
    uri = uri.substring(0, uri.length - 1);
  }

  var req = hyperquest(uri, requestOptions, function (err, res) {
    if (err) {
      cb(err);
    } else {
      statusCode = res.statusCode;
    }
  })
  .on('data', function (chunk) {
    data += chunk;
  })
  .on('end', function () {
    if (statusCode !== 200) {
      var error = new Error(data);
      error.statusCode = statusCode;
      cb(error);
    } else {
      cb(null, JSON.parse(data));
    }
  });

  if (body) {
    req.write(body);
    req.end();
  }
}

exports.makeRequest = makeRequest;

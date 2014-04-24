function handleParams(options, cb) {
  if (typeof(options) === 'function') {
    cb = options;
    options = {};
  } else if (options === null) {
    options = {};
  }

  return { options: options, cb: cb };
}

exports.handleParams = handleParams;

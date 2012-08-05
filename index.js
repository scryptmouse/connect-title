//     connect-title v0.0.1
//     © 2012 Alexa Grey, http://alexa.is
//     Distributed under the MIT license.

(function() {
  'use strict';

  var slice           = Array.prototype.slice
    , defaultOptions  = require(__dirname + '/defaults.json')
    , Title           = require(__dirname + '/Title');

  // Borrowed from _.js
  function defaults(obj) {
    slice.call(arguments, 1).forEach(function(source) {
      for (var prop in source) {
        if (typeof obj[prop] === 'undefined')
          obj[prop] = source[prop];
      }
    });
    return obj;
  }

  // ###Middleware generator function
  //
  // Accepts either a string or object
  // as an optional parameter.
  //
  // * If passed a string, it is set as
  //   the 'base' title, e.g. site name
  // * If passed an object, it should
  //   have at least one of the following
  //   keys:
  //     * `base` : for the above
  //     * `sep`  : to change the separator.
  module.exports = function(options) {

    if (typeof options === 'string') {
      options = { base: options };
    } else {
      options = options || {};
    }

    defaults(options, defaultOptions);

    return function (req, res, next) {
      var title = new Title(options.base, options.sep);
      // Don't clobber `title` on response object,
      if (typeof res.title === 'undefined')
        res.title = title;

      res.locals.title = title;

      next();
    };
  };

}).call(this);

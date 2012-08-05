//     connect-title v0.0.1
//     © 2012 Alexa Grey, http://alexa.is
//     Distributed under the MIT license.

(function() {
  'use strict';

  var Title, defaultOptions = require('./defaults.json');

  // ### Title
  // Create a new **Title**
  module.exports = Title = function (base, sep) {
    this.base = base || defaultOptions.base;
    this.sep  = sep  || defaultOptions.sep;
    this.pieces = [];
  };

  // ### #toString
  // Render the title when it is cast to string
  Title.prototype.toString = function() {
    return [this.base].concat(this.pieces).join(this.sep);
  };

  // ### #add
  // Add a variable number of pieces to the title
  //
  // Usage example:
  //
  //     res.locals.title.add('Products', 'View', product.name);
  //
  Title.prototype.add = function() {
    var args = Array.prototype.slice.call(arguments);

    this.pieces = this.pieces.concat(args);

    // Supports chaining, if you're into that.
    return this;
  };

  // ### #reset
  // Reset the title to the base, removing any
  // pieces that have been appended during
  // the response chain.
  Title.prototype.reset = function(base) {
    // Accepts an optional parameter to override
    // the app-wide default on a case-by-case basis.
    if (typeof base === 'string') {
      this.base = base;
    }

    this.pieces = [];

    // Also supports chaining to your heart's content.
    return this;
  };

  // Export the title _CommonJS_-style.

}).call(this);

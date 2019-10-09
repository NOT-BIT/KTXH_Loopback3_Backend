'use strict';

module.exports = function(server) {
    require('events').EventEmitter.prototype._maxListeners = 0;
};

const fs = require('fs');
const { bindNodeCallback } = require('rxjs/observable/bindNodeCallback');
const { catchError, map } = require('rxjs/operators');

const access = bindNodeCallback(fs.access);

module.exports = function exists(p) {
  return access(p).pipe(map(() => true), catchError(() => [false]));
};

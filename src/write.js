const fs = require('fs');
const path = require('path');
const { homedir } = require('os');
const { bindNodeCallback } = require('rxjs');
const { tap, catchError, mapTo, concatMap } = require('rxjs/operators');

const mkdir = require('./utils/mkdir');
const writeFile = bindNodeCallback(fs.writeFile);

module.exports = function write(
  name,
  content,
  options = { dir: path.join(`${homedir()}`, '.config') }
) {
  const c = JSON.stringify(content);

  return mkdir(options.dir).pipe(
    concatMap(() =>
      writeFile(path.join(options.dir, `.${name}`), c).pipe(mapTo(c))
    ),
    catchError(/* istanbul ignore next */ () => [false])
  );
};

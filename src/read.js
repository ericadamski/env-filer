const fs = require('fs');
const { merge, bindNodeCallback } = require('rxjs');
const { partition, catchError, map, switchMap } = require('rxjs/operators');

const exists = require('./exists');
const readFile = bindNodeCallback(fs.readFile);

module.exports = function read(p) {
  const [file$, empty$] = exists(p).pipe(partition(v => v));

  return merge(
    file$.pipe(
      switchMap(() => readFile(p)),
      map(buffer => buffer.toString()),
      map(d => JSON.parse(d))
    ),
    empty$.pipe(map(() => false))
  ).pipe(catchError(() => [false]));
};

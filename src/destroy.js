const exists = require('./exists');
const fs = require('fs');
const { merge, bindNodeCallback } = require('rxjs');
const { partition, catchError, map, switchMap } = require('rxjs/operators');

const unlink = bindNodeCallback(fs.unlink);

module.exports = function destroy(p) {
  const [file$, empty$] = exists(p).pipe(partition(v => v));

  return merge(
    file$.pipe(switchMap(() => unlink(p)), map(() => true)),
    empty$.pipe(map(() => false))
  );
};

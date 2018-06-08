const { spawn } = require('child_process');

const { merge, fromEvent } = require('rxjs');
const { map, filter, take, tap } = require('rxjs/operators');

module.exports = function mkdir(p) {
  let called = false;
  const c = spawn('mkdir', ['-p', p], { stdio: 'ignore' });

  return merge(
    fromEvent(c, 'exit'),
    fromEvent(c, 'error').pipe(
      map(err => {
        /* istanbul ignore next */
        throw new Error(err);
      })
    )
  ).pipe(filter(() => !called), tap(() => (called = true)), take(1));
};

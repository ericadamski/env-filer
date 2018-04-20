const { spawn } = require('child_process');

const { merge } = require('rxjs/observable/merge');
const { fromEvent } = require('rxjs/observable/fromEvent');
const { map, filter, take, tap } = require('rxjs/operators');

module.exports = function mkdir(p) {
  let called = false;
  const c = spawn('mkdir', ['-p', p], { stdio: 'ignore' });

  return merge(
    fromEvent(c, 'exit').pipe(
      map((code, signal) => {
        /* istanbul ignore if */
        if (code)
          throw Object.assign(new Error(`git exited with error code ${code}`), {
            code,
            signal,
          });
      })
    ),
    fromEvent(c, 'error').pipe(
      map(err => {
        /* istanbul ignore next */
        throw new Error(err);
      })
    )
  ).pipe(filter(() => !called), tap(() => (called = true)), take(1));
};

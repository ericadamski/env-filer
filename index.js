const { homedir } = require('os');
const { join } = require('path');
const slugizoid = require('slugizoid').default;
const read = require('./src/read');
const write = require('./src/write');
const destroy = require('./src/destroy');

const DEFAULT_DIR = join(homedir(), '.config');

module.exports = function filer(
  name,
  dir = DEFAULT_DIR,
  options = { usePromises: false }
) {
  let d = dir;
  let o = options;

  if (typeof dir === 'object') (d = DEFAULT_DIR), (o = dir);

  const n = slugizoid(name).slugify();

  return {
    read() {
      const r$ = read(join(d, `.${n}`));

      return o.usePromises ? r$.toPromise() : r$;
    },
    write(v) {
      const w$ = write(n, v, { dir: d });

      return o.usePromises ? w$.toPromise() : w$;
    },
    destroy() {
      const d$ = destroy(join(d, `.${n}`));

      return o.usePromises ? d$.toPromise() : d$;
    },
  };
};

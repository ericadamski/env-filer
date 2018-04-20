const { homedir } = require('os');
const { join } = require('path');
const read = require('./src/read');
const write = require('./src/write');

module.exports = function filer(
  name,
  dir = join(homedir(), '.config'),
  options = { usePromises: false }
) {
  return {
    read() {
      const r = read(join(dir, `.${name}`));

      return options.usePromises ? r.toPromise() : r;
    },
    write(v) {
      const w = write(name, v, { dir });

      return options.usePromises ? w.toPromise() : w;
    },
  };
};

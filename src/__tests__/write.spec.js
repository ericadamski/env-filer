const { Observable } = require('rxjs');
const { promisify } = require('util');
const fs = require('fs');
const { homedir } = require('os');
const path = require('path');

const writeFile = promisify(fs.writeFile);
const deleteFile = promisify(fs.unlink);

const write = require('../write');
const read = require('../read');

const name = `tempfile-${Date.now()}`;

describe('.write', () => {
  const dir = path.join('/', 'tmp');

  afterEach(async () => {
    try {
      await deleteFile(path.join(dir, `.${name}`));
      await deleteFile(path.join(homedir(), '.config', `.${name}`));
    } catch (e) {
      /* NOOP */
    }
  });

  it('should be a function with arity 2', () => {
    // Assert
    expect(write).toBeInstanceOf(Function);
    expect(write).toHaveLength(2);
  });

  it('should return an observable', () => {
    // Assert
    expect(write()).toBeInstanceOf(Observable);
  });

  it('should write the content on the file, as JSON', () => {
    // Arrange
    const content = { a: 'b' };

    // Assert
    return write(name, content, { dir })
      .toPromise()
      .then(() => read(path.join(dir, `.${name}`)).toPromise())
      .then(v => expect(v).toEqual(content));
  });

  it('should write to ~/.config if no options are passed', () => {
    // Arrange
    const content = { a: 'b' };

    // Assert
    return write(name, content)
      .toPromise()
      .then(() => read(path.join(homedir(), '.config', `.${name}`)).toPromise())
      .then(v => expect(v).toEqual(content));
  });

  it("should create the path required if doesn't exist", () => {
    // Arrange
    const dir = path.join('/', 'tmp', 'a', 'dir');
    const content = { a: 'b' };

    // Assert
    return write(name, content, { dir })
      .toPromise()
      .then(() => read(path.join(dir, `.${name}`)).toPromise())
      .then(v => expect(v).toEqual(content));
  });
});

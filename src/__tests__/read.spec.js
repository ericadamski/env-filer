const { Observable } = require('rxjs');
const { promisify } = require('util');
const fs = require('fs');
const { join } = require('path');

const writeFile = promisify(fs.writeFile);
const deleteFile = promisify(fs.unlink);

const read = require('../read');

describe('.read', () => {
  const path = join('/', 'tmp', '.tempfile');

  it('should be a function with arity 1', () => {
    // Assert
    expect(read).toBeInstanceOf(Function);
    expect(read).toHaveLength(1);
  });

  it('should return an observable', () => {
    // Assert
    expect(read()).toBeInstanceOf(Observable);
  });

  it('should return the content on the file, as parsed JSON', async () => {
    // Arrange
    const content = JSON.stringify({ a: 'b' });
    await writeFile(path, content);

    // Assert
    return read(path)
      .toPromise()
      .then(v => expect(v).toEqual(JSON.parse(content)));
  });

  it('should return false with bad JSON', async () => {
    // Arrange
    const content = "a: 'b'";
    await writeFile(path, content);

    // Assert
    return read(path)
      .toPromise()
      .then(v => expect(v).toBeFalsy());
  });

  it('should return false otherwise', async () => {
    // Arrange
    await deleteFile(path);

    // Assert
    return read(path)
      .toPromise()
      .then(v => expect(v).toBeFalsy());
  });
});

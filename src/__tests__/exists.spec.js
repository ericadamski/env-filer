const { Observable } = require('rxjs');
const { promisify } = require('util');
const fs = require('fs');
const { join } = require('path');

const writeFile = promisify(fs.writeFile);
const deleteFile = promisify(fs.unlink);

const exists = require('../exists');

describe('.exists', () => {
  const path = join('/', 'tmp', '.tempfile');

  it('should be a function with arity 1', () => {
    // Assert
    expect(exists).toBeInstanceOf(Function);
    expect(exists).toHaveLength(1);
  });

  it('should return an observable', () => {
    // Assert
    expect(exists()).toBeInstanceOf(Observable);
  });

  it('should return true if the file exists', async () => {
    // Arrange
    await writeFile(path, 'test');

    // Assert
    return exists(path)
      .toPromise()
      .then(v => expect(v).toBeTruthy());
  });

  it('should return false otherwise', async () => {
    // Arrange
    await deleteFile(path);

    // Assert
    return exists(path)
      .toPromise()
      .then(v => expect(v).toBeFalsy());
  });
});

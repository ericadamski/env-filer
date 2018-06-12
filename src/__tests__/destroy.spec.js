const fs = require('fs');
const { join } = require('path');
const { promisify } = require('util');

const { Observable } = require('rxjs');

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);

const destroy = require('../destroy');

describe('destroy', () => {
  const path = join('/', 'tmp', '.tempfile');

  it('should be a function of arity 1', () => {
    //Assert
    expect(destroy).toBeInstanceOf(Function);
    expect(destroy).toHaveLength(1);
  });

  it('should return an `Observable`', () => {
    //Assert
    expect(destroy()).toBeInstanceOf(Observable);
  });

  it('should return true if successful', async () => {
    //Arrange
    await writeFile(path, '');

    //Assert
    return destroy(path)
      .toPromise()
      .then(v => expect(v).toBeTruthy());
  });

  it('should properly delete the file', async () => {
    //Arrange
    await writeFile(path, '');

    //Assert
    return destroy(path)
      .toPromise()
      .then(async () => {
        readFile(path)
          .then(() => fail('This should catch'))
          .catch(e => {
            expect(e.message).toMatch(/no such file or directory/);
          });
      });
  });

  it('should return false if file does not exists', async () => {
    //Assert
    return destroy()
      .toPromise()
      .then(v => expect(v).toBeFalsy());
  });
});

# env filer

🗃 A tiny package to help manage dot files for you

## Install

```
yarn add env-filer
```

or npm

```
npm -i env-filer
```

## Usage

```javascript
filer(name, [dir, [(options = { usePromises: false })]]);
```

* **name** the name to use for your dot file

  * ie. a name of `git-tokens` will label the file `.git-tokens`

* **dir** the location to write the dot file. _defaults to `~/.config`_

* **options** extra options, currently the only option is `usePromises: bool`

By default this library uses RxJS Observables. You can override that to output promises using the `usePromises` option.

```javascript
const filer = require('env-filer');

const dotfile = filer('git-tokens');

dotfile
  .write({ access_token: 'this is my token!' })
  .subscribe(() => console.log('I have written!')); // writes this to ~/.config/.git-tokens

dotfile.read().subscribe(data => console.log(data)); // { access_token: 'this is my token!' }
```

Using Promises

```javascript
const dotfile = filer('git-tokens', { usePromises: true });

await dotfile.write({ access_token: 'this is my token!' })// writes this to ~/.config/.git-tokens

console.log(await dotfile.read()); // { access_token: 'this is my token!' }
```

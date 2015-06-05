
# mnfy

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Dependency Status][david-image]][david-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

Minify your HTML, CSS, and JS in a child process with caching.
Suitable for long-running build systems on multicore computers.

```js
var mnfy = require('mnfy/master')

mnfy.js('function hello(){ return "world" }').then(function (res) {
  // res.code === function hello(){return"world"}
  // res.map === ???
})
```

If you only `require('mnfy')`, the same API will be returned,
but minification will no longer run in a separate process.

## API

### mnfy.js(string, [options]).then( res => )

Minify JS. Options are passed to `uglify-js`.

### mnfy.css(string, [options]).then( res => )

Minifies CSS. Options are passed to `clean-css`.

### mnfy.html(string, [options]).then( res => )

Minifies HTML. Options are passed to `html-minifer`.

### mnfy.fork()

Create a new child process.
Uses `slave`.
By default, all minification occurs in a single child process.
Fork more processes to use more cores.

[npm-image]: https://img.shields.io/npm/v/mnfy.svg?style=flat-square
[npm-url]: https://npmjs.org/package/mnfy
[github-tag]: http://img.shields.io/github/tag/webdeps/mnfy.svg?style=flat-square
[github-url]: https://github.com/webdeps/mnfy/tags
[travis-image]: https://img.shields.io/travis/webdeps/mnfy.svg?style=flat-square
[travis-url]: https://travis-ci.org/webdeps/mnfy
[coveralls-image]: https://img.shields.io/coveralls/webdeps/mnfy.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/webdeps/mnfy
[david-image]: http://img.shields.io/david/webdeps/mnfy.svg?style=flat-square
[david-url]: https://david-dm.org/webdeps/mnfy
[license-image]: http://img.shields.io/npm/l/mnfy.svg?style=flat-square
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/mnfy.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/mnfy

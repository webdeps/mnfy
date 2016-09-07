
var assert = require('assert')

var mnfy = require('..')
require('rimraf').sync(mnfy.tmpdir)
require('mkdirp').sync(mnfy.tmpdir)

describe('Standalone', function () {
  it('should minify JS', function () {
    return mnfy.js('function hello() { \n console.log("lol"); }').then(function (js) {
      assert.equal(js.code, 'function hello(){console.log("lol")}')
    })
  })

  it('should minify CSS', function () {
    return mnfy.css('body { box-sizing: border-box; }').then(function (css) {
      assert.equal(css.code, 'body{box-sizing:border-box}')
    })
  })

  it('should minify CSS in safe mode by default', function () {
    return mnfy.css('body { z-index: 1000; }').then(function (css) {
      assert.equal(css.code, 'body{z-index:1000}')
    })
  })

  it('should not mess with colors in fony-family', function () {
    return mnfy.css('body { font-family: Mark Pro Black }').then(function (css) {
      assert(!/#000/.test(css))
    })
  })

  it('should minify HTML', function () {
    return mnfy.html('<html>    </html>').then(function (html) {
      assert.equal(html.code, '<html> </html>')
    })
  })

  it('should pass options', function () {
    return mnfy.html('<html>    </html>', {
      collapseWhitespace: true
    }).then(function (html) {
      assert.equal(html.code, '<html></html>')
    })
  })
})

describe('As a master/slave', function () {
  var mnfy = require('../master')

  it('should minify JS', function () {
    return mnfy.js('function hello() { \n console.log("lol"); }').then(function (js) {
      assert.equal(js.code, 'function hello(){console.log("lol")}')
    })
  })

  it('should minify CSS', function () {
    return mnfy.css('body { box-sizing: border-box; }').then(function (css) {
      assert.equal(css.code, 'body{box-sizing:border-box}')
    })
  })

  it('should minify HTML', function () {
    return mnfy.html('<html>    </html>').then(function (html) {
      assert.equal(html.code, '<html> </html>')
    })
  })

  it('should pass options', function () {
    return mnfy.html('<html>    </html>', {
      collapseWhitespace: true
    }).then(function (html) {
      assert.equal(html.code, '<html></html>')
    })
  })
})

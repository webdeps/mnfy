
var assert = require('assert')

var mnfy = require('..')
require('rimraf').sync(mnfy.tmpdir)
require('mkdirp').sync(mnfy.tmpdir)

describe('Standalone', function () {
  it('should minify JS', function () {
    return mnfy.js('function hello() { \n console.log("lol"); }').then(function (js) {
      assert.equal(js, 'function hello(){console.log("lol")}')
    })
  })

  it('should minify CSS', function () {
    return mnfy.css('body { box-sizing: border-box; }').then(function (css) {
      assert.equal(css, 'body{box-sizing:border-box}')
    })
  })

  it('should minify HTML', function () {
    return mnfy.html('<html>    </html>').then(function (html) {
      assert.equal(html, '<html> </html>')
    })
  })

  it('should pass options', function () {
    return mnfy.html('<html>    </html>', {
      collapseWhitespace: true
    }).then(function (html) {
      assert.equal(html, '<html></html>')
    })
  })
})

describe('As a master/slave', function () {
  var mnfy = require('../master')

  it('should minify JS', function () {
    return mnfy.js('function hello() { \n console.log("lol"); }').then(function (js) {
      assert.equal(js, 'function hello(){console.log("lol")}')
    })
  })

  it('should minify CSS', function () {
    return mnfy.css('body { box-sizing: border-box; }').then(function (css) {
      assert.equal(css, 'body{box-sizing:border-box}')
    })
  })

  it('should minify HTML', function () {
    return mnfy.html('<html>    </html>').then(function (html) {
      assert.equal(html, '<html> </html>')
    })
  })

  it('should pass options', function () {
    return mnfy.html('<html>    </html>', {
      collapseWhitespace: true
    }).then(function (html) {
      assert.equal(html, '<html></html>')
    })
  })
})


var lazy = require('lazyrequire')(require)
var _htmlminifier = lazy('html-minifier')
var _cleancss = lazy('clean-css')
var _uglify = lazy('uglify-js')

var _tmpdir = require('os').tmpdir()
var mkdirp = require('mkdirp')
var crypto = require('crypto')
var path = require('path')
var fs = require('mz/fs')

// new instance per process, but whatever
var tmpdir = path.join(_tmpdir, random())
mkdirp.sync(tmpdir)

var uglify
var htmlminify

exports = module.exports = function (type, string, options) {
  var hash = type
    + '_'
    + sha256(string)
    + '_'
    + (options ? sha256(JSON.stringify(options)) : '')
  var tmp = path.join(tmpdir, hash)

  return fs.readFile(tmp, 'utf8').catch(function (err) {
    if (err.code !== 'ENOENT') throw err

    var out = exports['_' + type](string, options)
    fs.writeFile(tmp, out).catch(onerror)
    return out
  })
}

;[
  'js',
  'css',
  'html',
].forEach(function (type) {
  exports[type] = function (string, options) {
    return exports(type, string, options)
  }
})

exports._js = function (string, options) {
  options = options || {}
  options.fromString = true
  uglify = uglify || _uglify().minify
  return uglify(string, options)
}

exports._css = function (string, options) {
  options = options || {
    keepSpecialComments: 0,
    processImport: false,
    rebase: false,
  }
  return new (_cleancss())(options).minify(string)
}

exports._html = function (string, options) {
  options = options || {
    removeComments: true,
    collapseWhitespace: true,
    conservativeCollapse: true,
    collapseBooleanAttributes: true,
    useShortDoctype: true,
    removeScriptTypeAttributes: true,
    minifyJS: true,
    minifyCSS: true,
  }
  htmlminify = htmlminify || _htmlminifier().minify
  return htmlminify(string, options)
}

function sha256(string) {
  return crypto.createHash('sha256').update(string).digest('hex')
}

function random() {
  return Math.random().toString(36).slice(2)
}

/* istanbul ignore next */
function onerror(err) {
  console.error(err.stack)
}

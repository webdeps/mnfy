
var lazy = require('lazyrequire')(require)
var _htmlminifier = lazy('html-minifier')
var _cleancss = lazy('clean-css')
var _uglify = lazy('uglify-js')

var mkdirp = require('mkdirp')
var crypto = require('crypto')
var path = require('path')
var fs = require('mz/fs')

var version = require('../package.json').version;
var versions = {
  html: require('html-minifier/package.json').version,
  css: require('clean-css/package.json').version,
  js: require('uglify-js/package.json').version,
}

// new instance per process, but whatever
mnfy.tmpdir = path.join(require('os').tmpdir(), 'mnfy')
mkdirp.sync(mnfy.tmpdir)

var uglify
var htmlminify

module.exports = mnfy

function mnfy(type, string, options) {
  var hash = sha256([
    version,
    type,
    versions[type],
    sha256(string),
    sha256(JSON.stringify(options || {}))
  ].join('_'))
  var tmp = path.join(mnfy.tmpdir, hash)

  return fs.readFile(tmp, 'utf8').then(JSON.parse).catch(function (err) {
    /* istanbul ignore next */
    if (err.code !== 'ENOENT') throw err

    var out = mnfy['_' + type](string, options)
    // no need to wait for this
    fs.writeFile(tmp, JSON.stringify(out)).catch(onerror)
    return out
  })
}

;[
  'js',
  'css',
  'html',
].forEach(function (type) {
  mnfy[type] = function (string, options) {
    return mnfy(type, string, options)
  }
})

mnfy._js = function (string, options) {
  options = options || {}
  options.fromString = true
  uglify = uglify || _uglify().minify
  return uglify(string, options)
}

mnfy._css = function (string, options) {
  options = options || {
    keepSpecialComments: 0,
    processImport: false,
    rebase: false,
  }
  var css = new (_cleancss())(options).minify(string)
  return {
    code: css.styles,
  }
}

mnfy._html = function (string, options) {
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
  var html = htmlminify(string, options)
  return {
    code: html
  }
}

function sha256(string) {
  return crypto.createHash('sha256').update(string).digest('hex')
}

/* istanbul ignore next */
function onerror(err) {
  console.error(err.stack)
}

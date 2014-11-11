
var fn = module.exports = require('slave/master')(require.resolve('./slave.js'))
fn.fork()

;[
  'js',
  'css',
  'html',
].forEach(function (type) {
  fn[type] = function (string, options) {
    return fn(type, string, options)
  }
})

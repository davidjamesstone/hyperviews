const assert = require('assert')
const hv = require('..')

assert.equal(hv(`
<div></div>
`, 'esm'),
`export default function view (state, actions) {
  return h('div', {})
}
`)

assert.equal(hv(`
<div></div>
`, 'cjs'),
`module.exports = function view (state, actions) {
  return h('div', {})
}
`)

assert.equal(hv(`
<div></div>
`, 'browser'),
`window.view = function (state, actions) {
  return h('div', {})
}
`)

assert.equal(hv(`
<div></div>
`, 'customVar'),
`var customVar = function view (state, actions) {
  return h('div', {})
}
`)

assert.equal(hv(`
<div></div>
`, 'raw'),
`h('div', {})
`)

assert.equal(hv(`
<div></div>
`, 'cjs', 'customFnName', 'c u s t o m'),
`module.exports = function customFnName (c, u, s, t, o, m) {
  return h('div', {})
}
`)

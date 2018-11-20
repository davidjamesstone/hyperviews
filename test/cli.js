const assert = require('assert')
const hv = require('..')

assert.strictEqual(hv(`
<div></div>
`, 'esm'),
`export default function view (props, state) {
  return h('div')
}
`)

assert.strictEqual(hv(`
<div></div>
`, 'cjs'),
`module.exports = function view (props, state) {
  return h('div')
}
`)

assert.strictEqual(hv(`
<div></div>
`, 'browser'),
`window.view = function view (props, state) {
  return h('div')
}
`)

assert.strictEqual(hv(`
<div></div>
`, 'customVar'),
`var customVar = function view (props, state) {
  return h('div')
}
`)

assert.strictEqual(hv(`
<div></div>
`, 'raw'),
`h('div')
`)

assert.strictEqual(hv(`
<div></div>
`, 'cjs', 'customFnName', 'c u s t o m'),
`module.exports = function customFnName (c, u, s, t, o, m) {
  return h('div')
}
`)

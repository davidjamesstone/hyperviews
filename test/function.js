const assert = require('assert')
const hv = require('..')

assert.strictEqual(hv(`
<function name="a" args="b c d">
  <span>A</span>
</function>
`, 'cjs'),
`module.exports = function a (b, c, d) {
  return h('span', null, 'A')
}
`)

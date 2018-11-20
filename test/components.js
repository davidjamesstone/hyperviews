const assert = require('assert')
const hv = require('..')

assert.strictEqual(hv(`
<div>
  <CustomComponent />
</div>
`, 'cjs'),
`module.exports = function view (props, state) {
  return h('div', null, h(CustomComponent))
}
`)

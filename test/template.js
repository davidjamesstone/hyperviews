const assert = require('assert')
const hv = require('..')

assert.strictEqual(hv(`
<template name="a" args="b c d">
  <span>A</span>
</template>
`, 'cjs'),
`module.exports = function a (b, c, d) {
  return h('span', null, 'A')
}
`)

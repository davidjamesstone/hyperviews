const assert = require('assert')
const hv = require('..')

assert.strictEqual(hv(`
<a href="http://example.com" onclick={actions.do()}>{state.foo}</a>
`),
`h('a', { href: 'http://example.com', onclick: function (e) { actions.do() } }, (state.foo))
`)

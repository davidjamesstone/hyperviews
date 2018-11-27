const assert = require('assert')
const hv = require('..')

assert.strictEqual(hv(`
<a href="http://example.com" onclick=this.onClick>{state.foo}</a>
`),
`h('a', { href: 'http://example.com', onclick: this.onClick }, (state.foo))
`)

assert.strictEqual(hv(`
<a href="http://example.com" onclick='e => e.preventDefault()'>{state.foo}</a>
`),
`h('a', { href: 'http://example.com', onclick: e => e.preventDefault() }, (state.foo))
`)

assert.strictEqual(hv(`
<a href="http://example.com" onclick="'alert()'">{state.foo}</a>
`),
`h('a', { href: 'http://example.com', onclick: 'alert()' }, (state.foo))
`)

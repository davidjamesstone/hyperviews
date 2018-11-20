const assert = require('assert')
const hv = require('..')

assert.strictEqual(hv(`
<div></div>
`),
`h('div')
`)

assert.strictEqual(hv(`
<div></div>
<div></div>
`),
`h('div')
h('div')
`)

assert.strictEqual(hv(`
<div id="foo"></div>
`),
`h('div', { id: 'foo' })
`)

assert.strictEqual(hv(`
<div id='foo'>{state.name}</div>
`),
`h('div', { id: 'foo' }, (state.name))
`)

assert.strictEqual(hv(`
<div class={state.foo} width={state.width}>{state.name}</div>
`),
`h('div', { class: (state.foo), width: (state.width) }, (state.name))
`)

assert.strictEqual(hv(`
<div id='id'>{state.firstName + ' ' + state.lastName}</div>
`),
`h('div', { id: 'id' }, (state.firstName + ' ' + state.lastName))
`)

assert.strictEqual(hv(`
<div>
  <span>text</span>
</div>
`),
`h('div', null, h('span', null, 'text'))
`)

assert.strictEqual(hv(`
<div>
  <b>x</b>
  <a>y</a>
</div>
`),
`h('div', null, [
  h('b', null, 'x'),
  h('a', null, 'y')
])
`)

assert.strictEqual(hv(`
<p style="{ color: '#ddd', fontSize: '12px' }"></p>
`),
`h('p', { style: { color: '#ddd', fontSize: '12px' } })
`)

assert.strictEqual(hv(`
<p style="{ color: state.color, fontSize: '12px' }"></p>
`),
`h('p', { style: { color: state.color, fontSize: '12px' } })
`)

const assert = require('assert')
const hv = require('..')

assert.equal(hv(`
<div></div>
`),
`h('div', {})
`)

assert.equal(hv(`
<div id="foo"></div>
`),
`h('div', { id: 'foo' })
`)

assert.equal(hv(`
<div id='foo'>{state.name}</div>
`),
`h('div', { id: 'foo' }, (state.name))
`)

assert.equal(hv(`
<div class={state.foo} width={state.width}>{state.name}</div>
`),
`h('div', { class: (state.foo), width: (state.width) }, (state.name))
`)

assert.equal(hv(`
<div id='id'>{state.firstName + ' ' + state.lastName}</div>
`),
`h('div', { id: 'id' }, (state.firstName + ' ' + state.lastName))
`)

assert.equal(hv(`
<div>
  <span>text</span>
</div>
`),
`h('div', {}, h('span', {}, 'text'))
`)

assert.equal(hv(`
<div>
  <b>x</b>
  <a>y</a>
</div>
`),
`h('div', {}, [
  h('b', {}, 'x'),
  h('a', {}, 'y')
])
`)

assert.equal(hv(`
<p style="{ color: '#ddd', fontSize: '12px' }"></p>
`),
`h('p', { style: { color: '#ddd', fontSize: '12px' } })
`)

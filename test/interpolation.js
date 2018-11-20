const assert = require('assert')
const hv = require('..')

assert.strictEqual(hv(`
<div>{state.foo}</div>
`),
`h('div', null, (state.foo))
`)

assert.strictEqual(hv(`
<div>
  {state.bar}
</div>
`),
`h('div', null, (state.bar))
`)

assert.strictEqual(hv(`
<div>
  <span>The value of bar is {state.bar}!</span>
</div>
`),
`h('div', null, h('span', null, 'The value of bar is ' + (state.bar) + '!'))
`)

assert.strictEqual(hv(`
<div>
  <span>{state.a}{state.c}</span>
</div>
`),
`h('div', null, h('span', null, (state.a) + (state.c)))
`)

assert.strictEqual(hv(`
<div>
  <span>{state.a} {state.b} {state.c}</span>
</div>
`),
`h('div', null, h('span', null, (state.a) + ' ' + (state.b) + ' ' + (state.c)))
`)

assert.strictEqual(hv(`
<div>
  <span>a is {state.a}, b is {state.b} and c is {state.c}</span>
</div>
`),
`h('div', null, h('span', null, 'a is ' + (state.a) + ', b is ' + (state.b) + ' and c is ' + (state.c)))
`)

assert.strictEqual(hv(`
<div id='id'>{state.firstName} {state.lastName}</div>
`),
`h('div', { id: 'id' }, (state.firstName) + ' ' + (state.lastName))
`)

assert.strictEqual(hv(`
<div>
  My name is Elizabeth II.
  I am your Queen.
</div>
`),
`h('div', null, 'My name is Elizabeth II.\\
  I am your Queen.')
`)

assert.strictEqual(hv(`
<div>
  <a href="http://www.google.co.uk?q={state.query}"></a>
  My name is {state.name} my age is {state.age} and I live at {state.address}
</div>
`),
`h('div', null, [
  h('a', { href: 'http://www.google.co.uk?q=' + (state.query) }),
  'My name is ' + (state.name) + ' my age is ' + (state.age) + ' and I live at ' + (state.address)
])
`)

assert.strictEqual(hv(`
<div>
  My name is {state.name} my age is {state.age}.
  I live at {state.address}
</div>
`),
`h('div', null, 'My name is ' + (state.name) + ' my age is ' + (state.age) + '.\\
  I live at ' + (state.address))
`)

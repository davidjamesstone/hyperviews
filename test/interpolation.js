const assert = require('assert')
const hv = require('..')

assert.equal(hv(`
<div>{state.foo}</div>
`),
`h('div', {}, (state.foo))
`)

assert.equal(hv(`
<div>
  {state.bar}
</div>
`),
`h('div', {}, (state.bar))
`)

assert.equal(hv(`
<div>
  <span>The value of bar is {state.bar}!</span>
</div>
`),
`h('div', {}, h('span', {}, 'The value of bar is ' + (state.bar) + '!'))
`)

assert.equal(hv(`
<div>
  <span>{state.a}{state.c}</span>
</div>
`),
`h('div', {}, h('span', {}, (state.a) + (state.c)))
`)

assert.equal(hv(`
<div>
  <span>{state.a} {state.b} {state.c}</span>
</div>
`),
`h('div', {}, h('span', {}, (state.a) + ' ' + (state.b) + ' ' + (state.c)))
`)

assert.equal(hv(`
<div>
  <span>a is {state.a}, b is {state.b} and c is {state.c}</span>
</div>
`),
`h('div', {}, h('span', {}, 'a is ' + (state.a) + ', b is ' + (state.b) + ' and c is ' + (state.c)))
`)

assert.equal(hv(`
<div id='id'>{state.firstName} {state.lastName}</div>
`),
`h('div', { id: 'id' }, (state.firstName) + ' ' + (state.lastName))
`)

assert.equal(hv(`
<div>
  My name is Elizabeth II.
  I am your Queen.
</div>
`),
`h('div', {}, 'My name is Elizabeth II.\\
  I am your Queen.')
`)

assert.equal(hv(`
<div>
  <a href="http://www.google.co.uk?q={state.query}"></a>
  My name is {state.name} my age is {state.age} and I live at {state.address}
</div>
`),
`h('div', {}, [
  h('a', { href: 'http://www.google.co.uk?q=' + (state.query) }),
  'My name is ' + (state.name) + ' my age is ' + (state.age) + ' and I live at ' + (state.address)
])
`)

assert.equal(hv(`
<div>
  My name is {state.name} my age is {state.age}.
  I live at {state.address}
</div>
`),
`h('div', {}, 'My name is ' + (state.name) + ' my age is ' + (state.age) + '.\\
  I live at ' + (state.address))
`)

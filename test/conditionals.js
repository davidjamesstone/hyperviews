const assert = require('assert')
const hv = require('..')

assert.strictEqual(hv(`
<div>
  <if condition="state.bar === 1">
    <span>Show Me!</span>
  </if>
</div>
`),
`h('div', null, (function () {
  if (state.bar === 1) {
    return h('span', null, 'Show Me!')
  }
})())
`)

assert.strictEqual(hv(`
<div>
  <span if="state.bar === 1">Show Me!</span>
</div>
`),
`h('div', null, state.bar === 1 ? h('span', null, 'Show Me!') : undefined)
`)

assert.strictEqual(hv(`
<div>
  <if condition="state.bar % 2">
    <span>odd</span>
  <else>
    <span>even</span>
  </if>
</div>
`),
`h('div', null, (function () {
  if (state.bar % 2) {
    return h('span', null, 'odd')
  } else {
    return h('span', null, 'even')
  }
})())
`)

assert.strictEqual(hv(`
<div>
  <if condition="state.bar === 1">
    <span>1</span>
  <elseif condition="state.bar === 2">
    <span>2</span>
  </if>
</div>
`),
`h('div', null, (function () {
  if (state.bar === 1) {
    return h('span', null, '1')
  } else if (state.bar === 2) {
    return h('span', null, '2')
  }
})())
`)

assert.strictEqual(hv(`
<div>
  <if condition="state.bar === 1">
    <span>1</span>
  <elseif condition="state.bar === 2">
    <span>2</span>
  <else>
    <span>bar is neither 1 or 2, it's {state.bar}!</span>
  </if>
</div>
`),
`h('div', null, (function () {
  if (state.bar === 1) {
    return h('span', null, '1')
  } else if (state.bar === 2) {
    return h('span', null, '2')
  } else {
    return h('span', null, "bar is neither 1 or 2, it's " + (state.bar) + '!')
  }
})())
`)

assert.strictEqual(hv(`
<section>
  <if condition="state.foo === 1">
    <span>foo1</span>
    <if condition="state.bar === 1">
      <span>bar1</span>
    <else>
      <span>bar2</span>
    </if>
  <elseif condition="state.foo === 2">
    <span>foo2</span>
  <elseif condition="state.foo === 3">
    <span>foo3</span>
  <else>
    Default
  </if>
</section>
`),
`h('section', null, (function () {
  if (state.foo === 1) {
    return [
      h('span', null, 'foo1'),
      (function () {
        if (state.bar === 1) {
          return h('span', null, 'bar1')
        } else {
          return h('span', null, 'bar2')
        }
      })()
    ]
  } else if (state.foo === 2) {
    return h('span', null, 'foo2')
  } else if (state.foo === 3) {
    return h('span', null, 'foo3')
  } else {
    return 'Default'
  }
})())
`)

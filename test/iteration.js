const assert = require('assert')
const hv = require('..')

assert.strictEqual(hv(`
<ul>
  <li each="item in state.items">
    <span>{item}</span>
    <span>OK</span>
  </li>
</ul>
`),
`h('ul', null, (state.items || []).map(function ($value, $index, $target) {
  var item = $value
  return h('li', null, [
    h('span', null, (item)),
    h('span', null, 'OK')
  ])
}, this))
`)

assert.strictEqual(hv(`
<ul>
  <li each="item in state.items" key={item}>
    <span>{item}</span>
    <span>OK</span>
  </li>
</ul>
`),
`h('ul', null, (state.items || []).map(function ($value, $index, $target) {
  var item = $value
  return h('li', { 'key': (item) }, [
    h('span', null, (item)),
    h('span', null, 'OK')
  ])
}, this))
`)

assert.strictEqual(hv(`
<ul>
  <li each="item in state.items.filter(i => i.isPublished)">
    <span>{item}</span>
    <span>OK</span>
  </li>
</ul>
`),
`h('ul', null, (state.items.filter(i => i.isPublished) || []).map(function ($value, $index, $target) {
  var item = $value
  return h('li', null, [
    h('span', null, (item)),
    h('span', null, 'OK')
  ])
}, this))
`)

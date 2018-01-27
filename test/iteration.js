const assert = require('assert')
const hv = require('..')

assert.equal(hv(`
<ul>
  <li each="item in state.items">
    <span>{item}</span>
    <span>OK</span>
  </li>
</ul>
`),
`h('ul', {}, (state.items || []).map(function ($value, $index, $target) {
  var item = $value
  return h('li', {}, [
    h('span', {}, (item)),
    h('span', {}, 'OK')
  ])
}))
`)

assert.equal(hv(`
<ul>
  <li each="item in state.items" key={item}>
    <span>{item}</span>
    <span>OK</span>
  </li>
</ul>
`),
`h('ul', {}, (state.items || []).map(function ($value, $index, $target) {
  var item = $value
  return h('li', { key: (item) }, [
    h('span', {}, (item)),
    h('span', {}, 'OK')
  ])
}))
`)

assert.equal(hv(`
<ul>
  <li each="item in state.items.filter(i => i.isPublished)">
    <span>{item}</span>
    <span>OK</span>
  </li>
</ul>
`),
`h('ul', {}, (state.items.filter(i => i.isPublished) || []).map(function ($value, $index, $target) {
  var item = $value
  return h('li', {}, [
    h('span', {}, (item)),
    h('span', {}, 'OK')
  ])
}))
`)

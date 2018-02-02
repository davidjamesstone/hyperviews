const assert = require('assert')
const hv = require('..')

assert.equal(hv(`
<script>var s
</script>
`),
`var s
`)

assert.equal(hv(`
<ul>
  <li each="item in state.items" key={item}>
    <script>view(state, actions)</script>
  </li>
</ul>
`),
`h('ul', {}, (state.items || []).map(function ($value, $index, $target) {
  var item = $value
  return h('li', { key: (item) }, view(state, actions))
}))
`)

assert.equal(hv(`
<ul>
  <script each="item in state.items" key={item}>
    view(item, actions)
  </script>
</ul>
`),
`h('ul', {}, (state.items || []).map(function ($value, $index, $target) {
  var item = $value
  return view(item, actions)
}))
`)

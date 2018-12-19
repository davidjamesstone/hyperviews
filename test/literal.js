const assert = require('assert')
const hv = require('..')

assert.strictEqual(hv(`
<script>var s
</script>
`),
`var s
`)

assert.strictEqual(hv(`
<ul>
  <li each="item in state.items" key={item}>
    <script>view(props, state)</script>
  </li>
</ul>
`),
`h('ul', null, (state.items || []).map(function ($value, $index, $target) {
  var item = $value
  return h('li', { 'key': (item) }, view(props, state))
}, this))
`)

assert.strictEqual(hv(`
<ul>
  <script each="item in state.items" key={item}>
    view(item, actions)
  </script>
</ul>
`),
`h('ul', null, (state.items || []).map(function ($value, $index, $target) {
  var item = $value
  return view(item, actions)
}, this))
`)

assert.strictEqual(hv(`
<script>
const a = 'foo'
</script>
<ul>
  <li></li>
</ul>
`),
`const a = 'foo'
h('ul', null, h('li'))
`)

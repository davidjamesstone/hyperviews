const assert = require('assert')
const hv = require('..')

assert.strictEqual(hv(`
<div>
  <CustomComponent />
</div>
`, 'cjs'),
`module.exports = function view (props, state) {
  return h('div', null, h(CustomComponent))
}
`)

assert.strictEqual(hv(`
<script>
  import { h, Component } from 'preact'
  import MyComponent from './component.js'

  export default class MyCounter extends Component {
    constructor () {
      super()
    }

    componentDidMount () {

    }
  }
</script>

<function>
  <div>
    <h1>{state.count}</h1>
    <button onclick=this.onClickDown disabled="{state.count <= 0}">-</button>
    <button onclick=this.onClickUp>+</button>
    <MyComponent />
  </div>
</function>

<script>
  console.log('End')
</script>`),
`import { h, Component } from 'preact'
import MyComponent from './component.js'

export default class MyCounter extends Component {
  constructor () {
    super()
  }

  componentDidMount () {}
}

function view (props, state) {
  return h('div', null, [
    h('h1', null, (state.count)),
    h('button', { onclick: this.onClickDown, disabled: (state.count <= 0) }, '-'),
    h('button', { onclick: this.onClickUp }, '+'),
    h(MyComponent)
  ])
}

console.log('End')
`)

import MyComponent from './component.js'
const { h, Component } = window.preact

export default class MyCounter extends Component {
  constructor (props) {
    super(props)
    this.render = view

    this.state = {
      count: 0
    }

    this.onClickUp = () => {
      this.setState({ count: this.state.count + 1 })
    }

    this.onClickDown = (e) => {
      this.setState({ count: this.state.count - 1 })
    }
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

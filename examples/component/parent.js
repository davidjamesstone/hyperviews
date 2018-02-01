class Parent extends HTMLElement {
  constructor () {
    super()
    const state = {
      count: 0
    }

    const actions = {
      down: () => state => ({ count: state.count - 1 }),
      up: () => state => ({ count: state.count + 1 })
    }

    app(state, actions, parent, this)
  }
}

window.customElements.define('x-parent', Parent)
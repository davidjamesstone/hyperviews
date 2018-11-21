window.view = function view (props, state) {
  return h('main', null, [
    h('h1', null, (state.count)),
    h('button', { onclick: this.onClickDown, disabled: (state.count <= 0) }, '-'),
    h('button', { onclick: this.onClickUp }, '+'),
    h(MyComponent)
  ])
}

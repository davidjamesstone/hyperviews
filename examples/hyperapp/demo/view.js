window.view = function view (state, actions) {
  return h('main', null, [
    h('h1', null, (state.count)),
    h('button', { onclick: actions.down, disabled: (state.count <= 0) }, '-'),
    h('button', { onclick: actions.up }, '+')
  ])
}

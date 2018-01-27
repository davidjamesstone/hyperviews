window.view = function (state, actions) {
  return h('main', {}, [
    h('h1', {}, (state.count)),
    h('button', { onclick: function (e) { actions.down() }, disabled: (state.count <= 0) }, '-'),
    h('button', { onclick: function (e) { actions.up() } }, '+')
  ])
}

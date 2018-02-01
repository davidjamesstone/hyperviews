window.parent = function (state, actions) {
  return h('main', {}, [
    h('h1', {}, (state.count)),
    h('div', {}, [
      h('span', {}, 'Parent'),
      h('x-child', { showauthor: (!(state.count % 2)) })
    ]),
    h('button', { onclick: function (e) { actions.down() }, disabled: (!state.count) }, '-'),
    h('button', { onclick: function (e) { actions.up() } }, '+')
  ])
}

var h = require('hyperapp').h
module.exports = function view (state, actions) {
  return h('main', {}, [
    h('span', {}, (state.counter)),
    h('button', { onclick: function (e) { actions.down() }, disabled: (!state.counter) }, '-'),
    h('button', { onclick: function (e) { actions.up() } }, '+'),
    h('x-sidebar', {}),
    h('x-header', {}),
    h('x-footer', {})
  ])
}

window.view = function view (state, actions) {
  return h('section', null, [
    h('form', { 'onsubmit': actions.add }, [
      h('input', { 'type': 'text', 'name': 'text', 'class': 'form-control', 'placeholder': 'Enter new todo', 'value': (state.input), 'required': 'required', 'autocomplete': 'off', 'onchange': actions.updateInput }),
      h('input', { 'type': 'checkbox', 'onchange': actions.toggleAll })
    ]),
    h('ul', null, (state.todos || []).map(function ($value, $index, $target) {
      var todo = $value
      return h('li', { 'key': (todo.id) }, [
        ($index + 1) + '.',
        h('input', { 'type': 'text', 'value': (todo.text), 'onchange': e => actions.updateText({ id: todo.id, text: this.value }), 'class': 'form-control', 'style': { borderColor: todo.text ? '' : 'red', textDecoration: todo.done ? 'line-through' : '' } }),
        h('input', { 'type': 'checkbox', 'checked': (todo.done), 'onchange': e => actions.toggleDone(todo.id) })
      ])
    }, this)),
    h('span', null, 'Total ' + (state.todos.length)),
    state.todos.find(t => t.done) ? h('button', { 'onclick': actions.clearCompleted }, 'Clear completed') : undefined,
    h('pre', null, h('code', null, (JSON.stringify(state, null, 2))))
  ])
}

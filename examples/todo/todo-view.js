window.view = function (state, actions) {
  return h('section', {}, [
    h('form', { onsubmit: function (e) { actions.add(e) } }, [
      h('input', { type: 'text', name: 'text', class: 'form-control', placeholder: 'Enter new todo', value: (state.input), required: 'required', autocomplete: 'off', onchange: function (e) { state.input = this.value.trim() } }),
      h('input', { type: 'checkbox', onchange: function (e) { actions.toggleAll(this.checked) } })
    ]),
    h('ul', {}, (state.todos || []).map(function ($value, $index, $target) {
      var todo = $value
      return h('li', { key: (todo.id) }, [
        ($index + 1) + '.',
        h('input', { type: 'text', value: (todo.text), onchange: function (e) { actions.updateText({id: todo.id, text: this.value}) }, class: 'form-control', style: { borderColor: todo.text ? '' : 'red', textDecoration: todo.done ? 'line-through' : '' } }),
        h('input', { type: 'checkbox', checked: (todo.done), onchange: function (e) { actions.toggleDone(todo.id) } })
      ])
    })),
    h('span', {}, 'Total ' + (state.todos.length)),
    state.todos.find(t => t.done) ? h('button', { onclick: function (e) { actions.clearCompleted() } }, 'Clear completed') : undefined,
    h('pre', {}, h('code', {}, (JSON.stringify(state, null, 2))))
  ])
}

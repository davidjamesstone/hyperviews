const { h, Component } = window.preact

export default class Todos extends Component {
  constructor (props) {
    super(props)
    this.render = view

    this.state = {
      todos: [{ id: 1, text: 'Buy milk' }]
    }

    this.onSubmit = e => {
      e.preventDefault()
      this.setState({
        input: '',
        todos: this.state.todos.concat({
          id: Date.now(),
          text: this.state.input
        })
      })
    }

    this.onChangeInput = e => {
      this.setState({
        input: e.target.value.trim()
      })
    }

    this.onChangeDoneAll = e => {
      const done = e.target.checked
      this.setState({
        todos: this.state.todos.map(todo => {
          todo.done = done
          return todo
        })
      })
    }

    this.onChangeDone = (e, todo) => {
      this.setState({
        todos: this.state.todos.map(item => {
          if (item.id === todo.id) {
            item.done = !item.done
          }
          return item
        })
      })
    }

    this.onChangeText = (e, todo) => {
      this.setState({
        todos: this.state.todos.map(item => {
          if (item.id === todo.id) {
            item.text = e.target.value
          }
          return item
        })
      })
    }

    this.onClickClear = e => {
      this.setState({
        todos: this.state.todos.filter(t => !t.done)
      })
    }
  }
}

function view (props, state) {
  return h('section', null, [
    h('form', { onsubmit: this.onSubmit }, [
      h('input', { type: 'text', name: 'text', class: 'form-control', placeholder: 'Enter new todo', value: (state.input), required: 'required', autocomplete: 'off', onchange: this.onChangeInput }),
      h('input', { type: 'checkbox', onchange: this.onChangeDoneAll })
    ]),
    h('ul', null, (state.todos || []).map(function ($value, $index, $target) {
      var todo = $value
      return h('li', { key: (todo.id) }, [
        ($index + 1) + '.',
        h('input', { type: 'text', value: (todo.text), onchange: e => this.onChangeText(e, todo), class: 'form-control', style: { borderColor: todo.text ? '' : 'red', textDecoration: todo.done ? 'line-through' : '' } }),
        h('input', { type: 'checkbox', checked: (todo.done), onchange: e => this.onChangeDone(e, todo) })
      ])
    }, this)),
    h('span', null, 'Total ' + (state.todos.length)),
    state.todos.find(t => t.done) ? h('button', { onclick: this.onClickClear }, 'Clear done') : undefined,
    h('pre', null, h('code', null, (JSON.stringify(state, null, 2))))
  ])
}

const templates = []
const apps = []

templates.push(`
<button class={state.cls} onclick={actions.prompt()}>{state.text}</button>
`)

apps.push(`const state = {
  cls: 'my-cls',
  text: 'my text'
}

const actions = {
  down: () => state => ({ count: state.count - 1 })
}

app(state, actions, view, resultEl)
`)

templates.push(`<main>
  <h1>{state.count}</h1>
  <button onclick={actions.down()} disabled="{state.count <= 0}">-</button>
  <button onclick={actions.up()}>+</button>
</main>
`)

apps.push(`const state = {
  count: 0
}

const actions = {
  down: () => state => ({ count: state.count - 1 }),
  up: () => state => ({ count: state.count + 1 })
}

app(state, actions, view, resultEl)
`)

templates.push(`<section>
<!-- Add new todo and toggle all -->
<form onsubmit={actions.add(e)}>
  <input type=text name=text class=form-control
    placeholder="Enter new todo" value={state.input}
    required=required autocomplete=off
    onchange="{state.input = this.value.trim()}">
  <input type=checkbox onchange={actions.toggleAll(this.checked)}>
</form>

<!-- Todos list -->
<ul>
  <li each="todo in state.todos" key={todo.id}>
    {$index + 1}.
    <input type=text value={todo.text}
      onchange="{actions.updateText({id: todo.id, text: this.value})}" class=form-control
      style="{ borderColor: todo.text ? '': 'red', textDecoration: todo.done ? 'line-through': '' }">
    <input type=checkbox checked={todo.done}
      onchange={actions.toggleDone(todo.id)}>
  </li>
</ul>

<!-- Summary -->
<span>Total {state.todos.length}</span>
<button if="state.todos.find(t => t.done)" 
  onclick={actions.clearCompleted()}>
  Clear completed
</button>

<!-- Debug -->
<pre><code>{JSON.stringify(state, null, 2)}</code></pre>
</section>
`)

apps.push(`const state = {
  input: '',
  todos: [{
    id: 1,
    text: 'Buy milk'
  }, {
    id: 2,
    text: 'Buy coffee'
  }, {
    id: 3,
    text: 'Buy sugar',
    done: true
  }]
}

const actions = {
  add: (e) => state => {
    e.preventDefault()
    return {
      input: '',
      todos: state.todos.concat({
        id: Date.now(),
        text: state.input
      })
    }
  },
  updateText: (todo) => state => ({
    todos: state.todos.map(item => {
      if (item.id === todo.id) {
        item.text = todo.text
      }
      return item
    })
  }),
  toggleDone: (id) => state => ({
    todos: state.todos.map(item => {
      if (item.id === id) {
        item.done = !item.done
      }
      return item
    })
  }),
  clearCompleted: () => state => ({
    todos: state.todos.filter(t => !t.done)
  }),
  toggleAll: (value) => state => ({
    todos: state.todos.map(item => {
      item.done = value
      return item
    })
  })
}

app(state, actions, view, resultEl)
`)

const recipies = ['basics', 'demo', 'todo'].map((r, i) => ({
  id: r,
  template: templates[i],
  app: apps[i]
}))

module.exports = recipies

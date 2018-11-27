const hv = require('..')
const ex = `<div>
  <h1>{state.title} by {state.author}</h1>
  <p>Name: {state.name}</p>
  <button type=button onclick=this.onClick></button>
  <if condition=state.isLoggedIn>
    <a href='/logout'>Logout</a>
    <ul>
      <li each='post in state.posts' key={post.slug}>
        <a href='/post/{post.id}' title={post.title}>{post.name}</a>
      </li>
    </ul>
  <else>
    <a href='/login'>Login</a>
  </if>
</div>`

console.log(hv(ex))

const ex1 = `<function name='MyComponent' args='x y z'>
  <div>{x}</div>
</script>`

console.log(hv(ex1))

const ex2 = `<div>
<MyComponent foo='bar' />
</div>`

console.log(hv(ex2))

const ex3 = `
<script>

  import { h, Component } from 'preact'

  export default class MyComponent extends Component {
    constructor (props) {
      super(props)
      this.render = view

      this.onSubmit = e => {
        e.preventDefault()
        // ...
      }
    }
  }

</script>

<function>
  <section>
    <form onsubmit=this.onSubmit>
      <input type=text name=text value={state.text} />
      <input type=text name=description value={state.description} />
    </form>
  </section>        
</function>`

console.log(hv(ex3))

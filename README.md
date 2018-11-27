# hyperviews

`hyperviews` is a template language that transforms to hyperscript `h(tagName, attrs, children)`.

Use it as a build tool with any `h(tag, props, children)` compliant framework e.g. React, preact or hyperapp.

```js
const hv = require('hyperviews')

hv("<div id='foo'>{state.name}</div>")
// => h('div', { id: 'foo' }, (state.name))
```

### Installation

`npm i hyperviews`

### API

`hyperviews(tmpl, mode, name, argstr)`

- `tmpl` (required) - The template string.  
- `mode` - The output format. Can be one of [`raw`, `esm`, `cjs`, `browser`], or if any other value is passed the function is exported as a variable with that name. The default is `raw`.
- `name` - The default output function name. The default is `view`.
- `args` - The default function arguments. The default is `props state`.


### CLI

Reads the template from stdin, 

`cat examples/test.html | hyperviews --mode esm --name foo --args bar > examples/test.js`

See [more CLI examples](./test/cli.js)



## Template language


### Interpolation

Use curly braces in attributes and text.

```html
<div>
  <a class={state.class} href='http://www.google.co.uk?q={state.query}'></a>
  My name is {state.name} my age is {state.age} and I live at {state.address}
</div>
```

See [more interpolation examples](./test/interpolation.js)



### Conditionals

There are two forms of conditional.

Using an `if` attribute.

```html
<span if='state.bar === 1'>Show Me!</span>
```

Or using tags `<if>`, `<elseif>` and `<else>`

```html
<div>
  <if condition='state.bar === 1'>
    <span>1</span>
  <elseif condition='state.bar === 2'>
    <span>2</span>
  <else>
    <span>bar is neither 1 or 2, it's {state.bar}!</span>
  </if>
</div>
```

`if` tags can be [nested](./test/conditionals.js#L84).

See [more conditional examples](./test/conditionals.js)



### Iteration

The `each` attribute can be used to repeat over items in an Array.
Three additional variables are available during each iteration: `$value`, `$index` and `$target`.

It supports keyed elements as shown here.

```html
<ul>
  <li each='post in state.posts' key={post.id}>
    <span>{post.title} {$index}</span>
  </li>
</ul>
```

produces

```js
h('ul', {}, (state.posts || []).map(function ($value, $index, $target) {
  const post = $value
  return h('li', { key: (post.id) }, h('span', {}, (post.title) + ' ' + ($index)))
}, this))
```

See [more iteration examples](./test/iteration.js)



### Events

```html
<a href='http://example.com' onclick=this.onClick>{state.foo}</a>
```

produces this output


```js
h('a', { href: 'http://example.com', onclick: this.onClick, (state.foo))
```

See [more event examples](./test/events.js)

### Style

The `style` attribute expects an object

```html
<p style="{ color: state.color, fontSize: '12px' }"></p>
```

produces this output

```js
h('p', { style: { color: state.color, fontSize: '12px' } })
```



### Literal

The `script` tag literally outputs it's contents.

```html
<script>
  import { h, Component } from 'preact'
  import MyComponent from './component.js'
</script>
```

This is also useful for recursive nodes, e.g. a tree

```html
<if condition=state.children>
  <div>
    <a href='#{state.path}'>{state.name}</a>
    <ul>
      <li each='child in state.children'>
        <script>view(props, child)</script>
      </li>
    </ul>
  </div>
<else>
  <a href='#{state.path}'>{state.name}</a>
</if>
```

produces this output

```js
function view (props, state) {
  return (function () {
    if (state.children) {
      return h('div', {}, [
        h('a', { href: '#' + (state.path) }, (state.name)),
        h('ul', {}, (state.children || []).map(function ($value, $index, $target) {
          var child = $value
          return h('li', {}, view(props, child))
        }))
      ])
    } else {
      return h('a', { href: '#' + (state.path) }, (state.name))
    }
  })()
}
```

See [more literal examples](./test/literal.js)



### Function

The `function` tag outputs a function, returning it's contents.
Supports `name` and `args` attributes.

```html
<function name='MyComponent' args='x y z'>
  <div>{x}</div>
</script>
```

produces this output

```js
function MyComponent (x, y, z) {
  return h('div', null, (x))
}
```



### Components

Components are declared with if the tag starts with a capital letter.

```html
<div>
  <MyComponent foo='bar' />
</div>
```

produces this output

```js
h('div', null, h(MyComponent, { foo: 'bar' }))
```


### Module example

How you structure your app is down to you.
I like to keep js and html in separate files so a component might look like this:

- MyComponent
  - view.html (The template file e.g. `<div>{state.name}</div>`)
  - view.html.js (The transformed `h` output of the file above)
  - index.js (Imports the transformed view and exports the component)

but if you want you could build entire modules in a html file like this:

```html
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
</function>
```

Compiles to

```js
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

function view (props, state) {
  return h('section', null, h('form', { onsubmit: this.onSubmit }, [
    h('input', { type: 'text', name: 'text', value: (state.text) }),
    h('input', { type: 'text', name: 'description', value: (state.description) })
  ]))
}
```

More examples [here](https://github.com/davidjamesstone/hyperviews/tree/master/examples)


Using `browserify`?
Then install the `hyperviewify` transform so you can simply require templates.

`const view = require('./my-view.html')`

`npm i hyperviewify`
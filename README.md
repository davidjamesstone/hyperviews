# hyperviews

View template language that targets hyperscript.

Turns this HTML

```html
<div>
  <h1>{state.title} by {state.author}</h1>
  <p>Name: {state.name}</p>
  <button type="button" onclick={actions.click()}></button>
  <if condition="state.isLoggedIn">
    <a href="/logout">Logout</a>
    <ul>
      <li each="post in state.posts" key={post.slug}>
        <a href="/post/post.id" title="{post.title}">{post.name}</a>
      </li>
    </ul>
  <else>
    <a href="/login">Login</a>
  </if>
</div>
```

into this JavaScript

```js
const view = (state, actions) =>
h('div', {}, [
  h('h1', {}, (state.title) + ' by ' + (state.author)),
  h('p', {}, 'Name: ' + (state.name)),
  h('button', { type: 'button', onclick: function (e) { actions.click() } }),
  (function () {
    if (state.isLoggedIn) {
      return [
        h('a', { href: '/logout' }, 'Logout'),
        h('ul', {}, (state.posts ? (state.posts.map ? state.posts : Object.keys(state.posts)) : []).map(function ($value, $item, $target) {
          const post = $value
          return h('li', { key: (post.slug) }, h('a', { href: '/post/post.id', title: (post.title) }, (post.name)))
        }))
      ]
    } else {
      return h('a', { href: '/login' }, 'Login')
    }
  })()
])
```


Based on [superviews.js](https://github.com/davidjamesstone/superviews.js)



## Installation
`npm i hyperviews`




## Basics
```js
const hv = require('hyperviews')

hv("<div id='foo'>{state.name}</div>")
// => h('div', { id: 'foo' }, (state.name))
```



## Interpolation

Use curly braces in attributes and text.

```html
<div>
  <a class={state.class} href="http://www.google.co.uk?q={state.query}"></a>
  My name is {state.name} my age is {state.age} and I live at {state.address}
</div>
```

See [more examples](./test/interpolation.js)



## Conditionals

There are two forms of conditional.

Using an `if` attribute.

```html
<span if="state.bar === 1">Show Me!</span>
```

Or using tags `<if>`, `<elseif>` and `<else>`

```html
<div>
  <if condition="state.bar === 1">
    <span>1</span>
  <elseif condition="state.bar === 2">
    <span>2</span>
  <else>
    <span>bar is neither 1 or 2, it's {state.bar}!</span>
  </if>
</div>
```

`if` tags can be [nested](./test/conditionals.js#L84).

See [more examples](./test/conditionals.js)



## Iteration

Loop over arrays or objects using an `each` attribute.
It supports keyed elements as shown here.

```html
<ul>
  <li each="item in state.items" key={item}>
    <span>{item}</span>
  </li>
</ul>
```

See [more examples](./test/iteration.js)

## Events

```html
<a href="http://example.com" onclick={actions.do()}>{state.foo}</a>
```

produces this output


```js
  h('a', { href: 'http://example.com', onclick: function (e) { actions.do() } }, (state.foo))
```

See [more examples](./test/events.js)

## Style

The `style` attribute expects an object

```html
<p style="{ color: '#ddd', fontSize: '12px' }"></p>
```

produces this output

```js
h('p', { style: { color: '#ddd', fontSize: '12px' } })
```

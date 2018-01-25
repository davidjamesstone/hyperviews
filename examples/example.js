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

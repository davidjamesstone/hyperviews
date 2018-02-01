window.child = function (state, actions, children) {
  return h('div', {}, [
    h('h1', {}, (state.title)),
    (function () {
      if (state.showAuthor) {
        return [
          h('h2', {}, 'by ' + (state.author)),
          h('p', {}, 'Name: ' + (state.name))
        ]
      }
    })(),
    (function () {
      if (state.isLoggedIn) {
        return [
          h('ul', {}, (state.posts || []).map(function ($value, $index, $target) {
            var post = $value
            return h('li', { key: (post.slug) }, h('a', { href: '/post/post.id', title: (post.title) }, (post.name)))
          })),
          h('a', { onclick: function (e) { actions.logout() } }, 'Logout')
        ]
      } else {
        return h('a', { onclick: function (e) { actions.login() } }, 'Login')
      }
    })(),
    h('my-element', { key: 'xx', egg: 'leg' })
  ])
}

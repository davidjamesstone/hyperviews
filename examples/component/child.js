class Child extends HTMLElement {
  constructor () {
    super()
    console.log('Child constructor')
    const state = {
      title: 'Child Component',
      author: 'foo author',
      name: 'foo nane',
      isLoggedIn: false,
      showAuthor: false,
      posts: [{
        id: 1,
        slug: 'p1',
        name: 'foo',
        title: 'bar'
      }, {
        id: 1,
        slug: 'p2',
        name: 'baz',
        title: 'boz'
      }]
    }

    const actions = {
      login: () => state => ({ isLoggedIn: !state.isLoggedIn }),
      logout: () => state => ({ isLoggedIn: !state.isLoggedIn }),
      toggleShowAuthor: () => state => ({ showAuthor: !state.showAuthor })
    }
    
    this.actions = app(state, actions, child, this)
  }

  static get observedAttributes() {
    return ['showauthor']
  }

  attributeChangedCallback (name, oldValue, newValue) {
    console.log('attributeChangedCallback', name, oldValue, newValue)
    if (name === 'showauthor') {
      this.actions.toggleShowAuthor()
    }
  }
}

// class XComponent extends HTMLElement {
//   constructor (_) { return (_ = super(_)).init(), _; }
//   init () { /* override as you like */ }
// }

// class XChild extends XComponent {
//   init () {
//     console.log('XChild constructor')
//     const state = {
//       title: 'Child Component',
//       author: 'foo author',
//       name: 'foo nane',
//       isLoggedIn: false,
//       showAuthor: false,
//       posts: [{
//         id: 1,
//         slug: 'p1',
//         name: 'foo',
//         title: 'bar'
//       }, {
//         id: 1,
//         slug: 'p2',
//         name: 'baz',
//         title: 'boz'
//       }]
//     }

//     const actions = {
//       login: () => state => ({ isLoggedIn: !state.isLoggedIn }),
//       logout: () => state => ({ isLoggedIn: !state.isLoggedIn }),
//       toggleShowAuthor: () => state => ({ showAuthor: !state.showAuthor })
//     }

//     const view = function (state, actions) {
//       return h('main', {}, [
//         h('h1', {}, (state.count)),
//         h('button', { onclick: function (e) { actions.down() }, disabled: (state.count <= 0) }, '-'),
//         h('button', { onclick: function (e) { actions.up() } }, '+')
//       ])
//     }

//     this.actions = app(state, actions, view, this)
//   }

//   static get observedAttributes() {
//     return ['showauthor']
//   }

//   attributeChangedCallback (name, oldValue, newValue) {
//     console.log('attributeChangedCallback', name, oldValue, newValue)
//     if (name === 'showauthor') {
//       this.actions.toggleShowAuthor()
//     }
//   }
// }







function XComponent (options) {
  var view = options.view
  var state = options.state
  var actions = options.actions
  var ctor = options.constructor

  var opts = {
    constructor: (typeof ctor === 'function')
      ? function () { ctor.call(this); this.actions = app(state, actions, view, this) }
      : function () { this.actions = app(state, actions, view, this) }
  }

  for (var key in options) {
    switch (key) {
      case 'attributeChangedCallback':
        opts.onattribute = options[key]
        break;
      case 'connectedCallback':
        opts.onconnected = options[key]
        break;
      case 'disconnectedCallback':
      opts.ondisconnected = options[key]
      break;
      case 'view':
      case 'state':
      case 'actions':
      case 'constructor':
        break;
      default:
        opts[key] = options[key]
        break;
    }
  }

  return new Component(opts)
}

const MyElement = XComponent({
  name: 'my-element',
  state: {
    count: 0
  },
  actions: {
    down: () => state => ({ count: state.count - 1 }),
    up: () => state => ({ count: state.count + 1 })
  },
  view: function (state, actions) {
    return h('main', {}, [
      h('h1', {}, (state.count)),
      h('button', { onclick: function (e) { actions.down() }, disabled: (state.count <= 0) }, '-'),
      h('button', { onclick: function (e) { actions.up() } }, '+')
    ])
  },
  // one or more static property
  static: {
    observedAttributes: [],
    method() {}
  },
  // alias for createdCallback
  // the component is ready/upgraded here
  constructor () {
    console.log('XComponent constructor')
  },
  // alias for attributeChangedCallback
  attributeChangedCallback(name, oldValue, newValue) {
    console.log('attributeChangedCallback', name, oldValue, newValue)
  }
  // any other prototype definition is allowed
  // including getters and setters
})

// const MyElement = new Component({
//   // the Custom Element name
//   name: 'my-element',
//   // one or more static property
//   static: {
//     observedAttributes: [],
//     method() {}
//   },
//   // alias for createdCallback
//   // the component is ready/upgraded here
//   constructor() {
//     console.log('here')
//   },
//   // alias for attributeChangedCallback
//   onattribute(name, oldValue, newValue) {
//     console.log('onattribute', name, oldValue, newValue)
//   },
//   // alias for attachedCallback
//   onconnected() {},
//   // alias for detachedCallback
//   ondisconnected() {

//   }
//   // any other prototype definition is allowed
//   // including getters and setters
// })

window.customElements.define('x-child', Child)
// window.customElements.define('my-element', MyElement)
export default function factoryMyComponent (h) {
  return function MyComponent (props, state) {
    return h('span', null, [
      'Hello world!',
      h('span')
    ])
  }
}

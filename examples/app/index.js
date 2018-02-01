var hyperviews= require('../../element')

hyperviews({
  name: 'x-main',
  state: {
    counter: 0
  },
  actions: {
    down: () => state => ({ counter: state.counter - 1 }),
    up: () => state => ({ counter: state.counter + 1 })
  }, 
  view: require('./customelements/main')
})

hyperviews({
  name: 'x-sidebar',
  view: require('./customelements/sidebar')
})

hyperviews({
  name: 'x-header',
  view: require('./customelements/header')
})

hyperviews({
  name: 'x-footer',
  view: require('./customelements/footer')
})

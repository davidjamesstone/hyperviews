(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.hyperviews = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var app = require('hyperapp').app
var CEV0Component = require('ce-v0/comp')

function hyperviews (options) {
  var view = options.view
  var state = options.state
  var actions = options.actions
  var ctor = options.constructor

  var opts = {
    constructor: (typeof ctor === 'function')
      ? function () { ctor.call(this); this.actions = app(state, actions, view, this) }
      : function () { this.actions = app(state, actions, view, this) }
  }

  // Only fire attributeChangedCallback
  // if it's an observed attribute as per CEV1
  var onattribute = options.attributeChangedCallback
  var attributeChangedCallback = options.attributeChangedCallback
  if (attributeChangedCallback) {
    if (options.static && Array.isArray(options.static.observedAttributes)) {
      var observedAttributes = options.static.observedAttributes

      onattribute = function (name, oldValue, newValue) {
        if (observedAttributes.indexOf(name) < 0) {
          return
        }

        attributeChangedCallback(name, oldValue, newValue)
      }
    } else {
      onattribute = undefined
    }
  }

  for (var key in options) {
    switch (key) {
      case 'attributeChangedCallback':
        opts.onattribute = onattribute
        break
      case 'connectedCallback':
        opts.onconnected = options[key]
        break
      case 'disconnectedCallback':
        opts.ondisconnected = options[key]
        break
      case 'view':
      case 'state':
      case 'actions':
      case 'constructor':
        break
      default:
        opts[key] = options[key]
        break
    }
  }

  return new CEV0Component(opts)
}

module.exports = hyperviews

},{"ce-v0/comp":2,"hyperapp":3}],2:[function(require,module,exports){
function Component(e){"use strict";/*! (C) 2017 Andrea Giammarchi - Mit Style License */
var t,a,r=function(e,t,a,r){var c=Object.getOwnPropertyDescriptor(e,t);c&&(c.enumerable=!1,a[r]=c)},c={},n={},o=e.extends||HTMLElement;for(t in e)switch(t){case"extends":case"name":break;case"static":a=e[t];for(t in a)r(a,t,c,t);break;case"constructor":r(e,t,n,"createdCallback");break;case"onattribute":r(e,t,n,"attributeChangedCallback");break;case"onconnected":r(e,t,n,"attachedCallback");break;case"ondisconnected":r(e,t,n,"detachedCallback");break;default:r(e,t,n,t)}return(Object.setPrototypeOf||function(e,a){if(e.__proto__=a,!(e instanceof a)){delete e.__proto__;for(t in a)try{r(a,t,e,t)}catch(e){}}return e})(Object.defineProperties(document.registerElement(e.name,{prototype:Object.create(o.prototype,n)}),c),o)}try{module.exports=Component}catch(e){}
},{}],3:[function(require,module,exports){
!function(n,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd||e(n.hyperapp={})}(this,function(n){"use strict";n.h=function(n,e){for(var r,o=[],t=[],i=arguments.length;i-- >2;)o.push(arguments[i]);for(;o.length;)if(Array.isArray(r=o.pop()))for(i=r.length;i--;)o.push(r[i]);else null!=r&&!0!==r&&!1!==r&&t.push(r);return"function"==typeof n?n(e||{},t):{name:n,props:e||{},children:t}},n.app=function(n,e,r,o){function t(n,e){return{name:n.nodeName.toLowerCase(),props:{},children:e.call(n.childNodes,function(n){return 3===n.nodeType?n.nodeValue:t(n,e)})}}function i(){y=!y;var n=r(b,k);for(o&&!y&&(N=m(o,N,w,w=n));n=g.pop();)n()}function l(){y||(y=!y,setTimeout(i))}function u(n,e){var r={};for(var o in n)r[o]=n[o];for(var o in e)r[o]=e[o];return r}function f(n,e,r){var o={};return n.length?(o[n[0]]=n.length>1?f(n.slice(1),e,r[n[0]]):e,u(r,o)):e}function c(n,e){for(var r=0;r<n.length;r++)e=e[n[r]];return e}function p(n,e,r){for(var o in r)"function"==typeof r[o]?function(o,t){r[o]=function(o){return"function"==typeof(o=t(o))&&(o=o(c(n,b),r)),o&&o!==(e=c(n,b))&&!o.then&&l(b=f(n,u(e,o),b)),o}}(o,r[o]):p(n.concat(o),e[o]=e[o]||{},r[o]=u(r[o]))}function a(n){return n&&n.props?n.props.key:null}function s(n,e,r,o,t){if("key"===e);else if("style"===e)for(var i in u(t,r))n[e][i]=null==r||null==r[i]?"":r[i];else"function"==typeof r||e in n&&!o?n[e]=null==r?"":r:null!=r&&!1!==r&&n.setAttribute(e,r),null!=r&&!1!==r||n.removeAttribute(e)}function d(n,e){var r="string"==typeof n||"number"==typeof n?document.createTextNode(n):(e=e||"svg"===n.name)?document.createElementNS("http://www.w3.org/2000/svg",n.name):document.createElement(n.name);if(n.props){n.props.oncreate&&g.push(function(){n.props.oncreate(r)});for(var o=0;o<n.children.length;o++)r.appendChild(d(n.children[o],e));for(var t in n.props)s(r,t,n.props[t],e)}return r}function h(n,e,r){if(r=e.props){for(var o=0;o<e.children.length;o++)h(n.childNodes[o],e.children[o]);r.ondestroy&&r.ondestroy(n)}return n}function v(n,e,r,o){function t(){n.removeChild(h(e,r))}r.props&&(o=r.props.onremove)?o(e,t):t()}function m(n,e,r,o,t,i){if(o===r);else if(null==r)e=n.insertBefore(d(o,t),e);else if(o.name&&o.name===r.name){!function(n,e,r,o){for(var t in u(e,r))r[t]!==("value"===t||"checked"===t?n[t]:e[t])&&s(n,t,r[t],o,e[t]);r.onupdate&&g.push(function(){r.onupdate(n,e)})}(e,r.props,o.props,t=t||"svg"===o.name);for(var l=[],f={},c={},p=0;p<r.children.length;p++)l[p]=e.childNodes[p],null!=(w=a(y=r.children[p]))&&(f[w]=[l[p],y]);p=0;for(var h=0;h<o.children.length;){var y=r.children[p],N=o.children[h],w=a(y),b=a(N);if(c[w])p++;else if(null==b)null==w&&(m(e,l[p],y,N,t),h++),p++;else{var k=f[b]||[];w===b?(m(e,k[0],k[1],N,t),p++):k[0]?m(e,e.insertBefore(k[0],l[p]),k[1],N,t):m(e,l[p],null,N,t),h++,c[b]=N}}for(;p<r.children.length;)null==a(y=r.children[p])&&v(e,l[p],y),p++;for(var p in f)c[f[p][1].props.key]||v(e,f[p][0],f[p][1])}else o.name===r.name?e.nodeValue=o:(e=n.insertBefore(d(o,t),i=e),v(n,i,r));return e}var y,g=[],N=o&&o.children[0]||null,w=N&&t(N,[].map),b=u(n),k=u(e);return l(p([],b,k)),k}});

},{}]},{},[1])(1)
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"ce-v0/comp":7,"hyperapp":8}],2:[function(require,module,exports){
var h = require('hyperapp').h
module.exports = function view (state, actions) {
  return h('footer', {}, "I'm the footer")
}

},{"hyperapp":8}],3:[function(require,module,exports){
var h = require('hyperapp').h
module.exports = function view (state, actions) {
  return h('header', {}, "I'm the header")
}

},{"hyperapp":8}],4:[function(require,module,exports){
var h = require('hyperapp').h
module.exports = function view (state, actions) {
  return h('main', {}, [
    h('span', {}, (state.counter)),
    h('button', { onclick: function (e) { actions.down() }, disabled: (!state.counter) }, '-'),
    h('button', { onclick: function (e) { actions.up() } }, '+'),
    h('x-sidebar', {}),
    h('x-header', {}),
    h('x-footer', {})
  ])
}

},{"hyperapp":8}],5:[function(require,module,exports){
var h = require('hyperapp').h
module.exports = function view (state, actions) {
  return h('aside', {}, "I'm the sidebar")
}

},{"hyperapp":8}],6:[function(require,module,exports){
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

},{"../../element":1,"./customelements/footer":2,"./customelements/header":3,"./customelements/main":4,"./customelements/sidebar":5}],7:[function(require,module,exports){
function Component(e){"use strict";/*! (C) 2017 Andrea Giammarchi - Mit Style License */
var t,a,r=function(e,t,a,r){var c=Object.getOwnPropertyDescriptor(e,t);c&&(c.enumerable=!1,a[r]=c)},c={},n={},o=e.extends||HTMLElement;for(t in e)switch(t){case"extends":case"name":break;case"static":a=e[t];for(t in a)r(a,t,c,t);break;case"constructor":r(e,t,n,"createdCallback");break;case"onattribute":r(e,t,n,"attributeChangedCallback");break;case"onconnected":r(e,t,n,"attachedCallback");break;case"ondisconnected":r(e,t,n,"detachedCallback");break;default:r(e,t,n,t)}return(Object.setPrototypeOf||function(e,a){if(e.__proto__=a,!(e instanceof a)){delete e.__proto__;for(t in a)try{r(a,t,e,t)}catch(e){}}return e})(Object.defineProperties(document.registerElement(e.name,{prototype:Object.create(o.prototype,n)}),c),o)}try{module.exports=Component}catch(e){}
},{}],8:[function(require,module,exports){
!function(n,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd||e(n.hyperapp={})}(this,function(n){"use strict";n.h=function(n,e){for(var r,o=[],t=[],i=arguments.length;i-- >2;)o.push(arguments[i]);for(;o.length;)if(Array.isArray(r=o.pop()))for(i=r.length;i--;)o.push(r[i]);else null!=r&&!0!==r&&!1!==r&&t.push(r);return"function"==typeof n?n(e||{},t):{name:n,props:e||{},children:t}},n.app=function(n,e,r,o){function t(n,e){return{name:n.nodeName.toLowerCase(),props:{},children:e.call(n.childNodes,function(n){return 3===n.nodeType?n.nodeValue:t(n,e)})}}function i(){y=!y;var n=r(b,k);for(o&&!y&&(N=m(o,N,w,w=n));n=g.pop();)n()}function l(){y||(y=!y,setTimeout(i))}function u(n,e){var r={};for(var o in n)r[o]=n[o];for(var o in e)r[o]=e[o];return r}function f(n,e,r){var o={};return n.length?(o[n[0]]=n.length>1?f(n.slice(1),e,r[n[0]]):e,u(r,o)):e}function c(n,e){for(var r=0;r<n.length;r++)e=e[n[r]];return e}function p(n,e,r){for(var o in r)"function"==typeof r[o]?function(o,t){r[o]=function(o){return"function"==typeof(o=t(o))&&(o=o(c(n,b),r)),o&&o!==(e=c(n,b))&&!o.then&&l(b=f(n,u(e,o),b)),o}}(o,r[o]):p(n.concat(o),e[o]=e[o]||{},r[o]=u(r[o]))}function a(n){return n&&n.props?n.props.key:null}function s(n,e,r,o,t){if("key"===e);else if("style"===e)for(var i in u(t,r))n[e][i]=null==r||null==r[i]?"":r[i];else"function"==typeof r||e in n&&!o?n[e]=null==r?"":r:null!=r&&!1!==r&&n.setAttribute(e,r),null!=r&&!1!==r||n.removeAttribute(e)}function d(n,e){var r="string"==typeof n||"number"==typeof n?document.createTextNode(n):(e=e||"svg"===n.name)?document.createElementNS("http://www.w3.org/2000/svg",n.name):document.createElement(n.name);if(n.props){n.props.oncreate&&g.push(function(){n.props.oncreate(r)});for(var o=0;o<n.children.length;o++)r.appendChild(d(n.children[o],e));for(var t in n.props)s(r,t,n.props[t],e)}return r}function h(n,e,r){if(r=e.props){for(var o=0;o<e.children.length;o++)h(n.childNodes[o],e.children[o]);r.ondestroy&&r.ondestroy(n)}return n}function v(n,e,r,o){function t(){n.removeChild(h(e,r))}r.props&&(o=r.props.onremove)?o(e,t):t()}function m(n,e,r,o,t,i){if(o===r);else if(null==r)e=n.insertBefore(d(o,t),e);else if(o.name&&o.name===r.name){!function(n,e,r,o){for(var t in u(e,r))r[t]!==("value"===t||"checked"===t?n[t]:e[t])&&s(n,t,r[t],o,e[t]);r.onupdate&&g.push(function(){r.onupdate(n,e)})}(e,r.props,o.props,t=t||"svg"===o.name);for(var l=[],f={},c={},p=0;p<r.children.length;p++)l[p]=e.childNodes[p],null!=(w=a(y=r.children[p]))&&(f[w]=[l[p],y]);p=0;for(var h=0;h<o.children.length;){var y=r.children[p],N=o.children[h],w=a(y),b=a(N);if(c[w])p++;else if(null==b)null==w&&(m(e,l[p],y,N,t),h++),p++;else{var k=f[b]||[];w===b?(m(e,k[0],k[1],N,t),p++):k[0]?m(e,e.insertBefore(k[0],l[p]),k[1],N,t):m(e,l[p],null,N,t),h++,c[b]=N}}for(;p<r.children.length;)null==a(y=r.children[p])&&v(e,l[p],y),p++;for(var p in f)c[f[p][1].props.key]||v(e,f[p][0],f[p][1])}else o.name===r.name?e.nodeValue=o:(e=n.insertBefore(d(o,t),i=e),v(n,i,r));return e}var y,g=[],N=o&&o.children[0]||null,w=N&&t(N,[].map),b=u(n),k=u(e);return l(p([],b,k)),k}});

},{}]},{},[6]);

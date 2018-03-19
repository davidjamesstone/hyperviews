const hyperviews = require('..')
const ace = require('brace')
const recipies = require('./recipies')
require('brace/mode/javascript')
require('brace/mode/html')
require('brace/theme/monokai')

const templateEl = document.getElementById('template')
const appEl = document.getElementById('app')
const transformedEl = document.getElementById('transformed')
const transformButton = document.getElementById('transform')
const runButton = document.getElementById('run')
let resultEl = document.getElementById('result')

const templateEditor = ace.edit(templateEl)
templateEditor.getSession().setMode('ace/mode/html')
templateEditor.setTheme('ace/theme/monokai')

const appEditor = ace.edit(appEl)
appEditor.getSession().setMode('ace/mode/javascript')
appEditor.setTheme('ace/theme/monokai')
appEditor.session.setUseWorker(false)

const transformedEditor = ace.edit(transformedEl)
transformedEditor.getSession().setMode('ace/mode/javascript')
transformedEditor.setTheme('ace/theme/monokai')
// transformedEditor.setReadOnly(true)
transformedEditor.session.setUseWorker(false)

let template = `<main>
  <h1>{state.count}</h1>
  <button onclick={actions.down()} disabled="{state.count <= 0}">-</button>
  <button onclick={actions.up()}>+</button>
</main>
`

templateEditor.setValue(template)

function transform () {
  template = templateEditor.getValue()
  const output = hyperviews(template, 'browser')
  const opts = { indent_size: 2, space_in_empty_paren: true }
  transformedEditor.setValue(window.js_beautify(output, opts))

  runButton.style.display = ''
}

function run () {
  try {
    var newResult = document.createElement('div')
    newResult.setAttribute('id', 'result')

    resultEl.parentNode.replaceChild(newResult, resultEl)
    resultEl = newResult

    // eslint-disable-next-line
    eval(transformedEditor.getValue())
    // eslint-disable-next-line
    eval(appEditor.getValue())
  } catch (e) {
    window.alert('Failed to run - ' + e)
  }
}

window.resultEl = resultEl
transformButton.onclick = transform
runButton.onclick = run

const recipiesEl = document.getElementById('recipies')
recipiesEl.addEventListener('change', function () {
  const rcp = recipies.find(r => r.id === this.value)
  const tmpl = rcp.template
  const app = rcp.app

  templateEditor.setValue(tmpl)
  templateEditor.scrollToLine(1, 1, true)

  transformedEditor.setValue('')
  appEditor.setValue(app)
  appEditor.scrollToLine(1, 1, true)

  resultEl.innerHTML = ''
  runButton.style.display = 'none'
})

const standardize = require('standard-format')
const htmlparser = require('htmlparser2')
const delim = ['{', '}']
const startDelim = delim[0]
const specialEls = ['elseif', 'else']
const specialAttrs = ['if', 'each']
let root, buffer, curr, defaultFnName, defaultFnArgs

function strify (str) {
  str = str
    ? str.replace('\n', '\\\n')
    : ''

  return '"' + str + '"'
}

function interpolate (text) {
  const parts = text.split(/({.*?})/)

  text = parts.filter(p => p).map((part, index) => {
    if (part.startsWith('{')) {
      return `(${part.slice(1, -1)})`
    } else {
      return strify(part)
    }
  }).join(' + ')

  return text
}

function getIterator (target) {
  return `(${target} || [])`
}

function getAttrs (target) {
  const attributes = []

  for (const name in target.attribs) {
    if (specialAttrs.indexOf(name) === -1) {
      const value = target.attribs[name]
      let val = ''
      if (name === 'style' || name.startsWith('on')) {
        val = value
      } else if (value.indexOf(startDelim) > -1) {
        val = interpolate(value)
      } else {
        val = strify(value)
      }

      attributes.push({
        name: name,
        value: val
      })
    }
  }

  const attribs = attributes.length
    ? `{ ${attributes.map(a => `'${a.name}': ${a.value}`).join(', ')} }`
    : null

  return attribs
}

function getBranches (node, nodeOutput) {
  const branches = []

  if (node.name === 'if') {
    // Element based `if`
    let n = node

    do {
      branches.push({
        condition: n.attribs['condition'],
        rtn: n.childrenToString(true)
      })

      n = n.children.find(c => c.name === 'elseif' || c.name === 'else')
    } while (n)
  } else {
    // Attribute based `if`
    branches.push({
      condition: node.attribs['if'],
      rtn: nodeOutput
    })
  }

  return branches
}

class Node {
  constructor (parent, name, attribs) {
    this.parent = parent
    this.name = name
    this.attribs = attribs
    this.children = []
  }

  get isSpecial () {
    return specialEls.indexOf(this.name) > -1
  }

  childrenToString (filterSpecial) {
    const children = (filterSpecial
      ? this.children.filter(c => !c.isSpecial)
      : this.children).map(c => c.toString())

    let childstr = ''
    if (children.length) {
      childstr = children.length === 1
        ? children[0]
        : '[\n' + children.join(',\n') + '\n]'
    }

    return childstr
  }

  toString () {
    // Attributes
    const attribs = getAttrs(this)

    // Children
    const childstr = this.childrenToString()

    let node
    if (this.name === 'script') {
      node = this.children.toString()
    } else if (this.name === 'function') {
      const name = this.attribs.name || defaultFnName
      const argstr = this.attribs.args
        ? buildArgs(this.attribs.args)
        : defaultFnArgs

      node = `
        ${wrapFn(name, argstr, this.children.toString().trimLeft())}
      `
    } else {
      const isComponent = /^[A-Z]/.test(this.name)
      const name = isComponent ? this.name : `"${this.name}"`
      const args = [name]

      if (attribs || childstr) {
        args.push(attribs || 'null')

        if (childstr) {
          args.push(childstr)
        }
      }

      node = `h(${args.join(', ')})`
    }

    if (this.name === 'if') {
      const branches = getBranches(this, node)
      let str = ''
      branches.forEach((branch, index) => {
        if (branch.condition) {
          str += `${index === 0 ? 'if' : ' else if '} (${branch.condition}) {
            return ${branch.rtn}
          }`
        } else {
          str += ` else {
            return ${branch.rtn}
          }`
        }
      })

      return `(function () {
        ${str}
      }).call(this)`
    } else if ('if' in this.attribs) {
      return `${this.attribs['if']} ? ${node} : undefined`
    } else if ('each' in this.attribs) {
      const eachAttr = this.attribs['each']
      const eachParts = eachAttr.split(' in ')
      const key = eachParts[0]
      const target = eachParts[1]

      return `${getIterator(target)}.map(function ($value, $index, $target) {\nvar ${key} = $value\nreturn ${node}\n}, this)`
    } else {
      return node
    }
  }
}

class Root extends Node {
  get isSingleFunction () {
    const children = this.children
    if (children.length === 1) {
      const onlyChild = children[0]
      if (onlyChild.name === 'function') {
        return true
      }
    }
  }

  toString () {
    return this.children.map(c => c.toString()).join('\n').trim()
  }
}

const handler = {
  onopentag: function (name, attribs) {
    const newCurr = new Node(curr, name, attribs)
    curr.children.push(newCurr)
    buffer.push(newCurr)
    curr = newCurr
  },
  ontext: function (text) {
    if (!text || !(text = text.trim())) {
      return
    }

    let value
    if (curr.name === 'script') {
      value = text
    } else if (text.indexOf(startDelim) > -1) {
      value = interpolate(text)
    } else {
      value = strify(text)
    }

    curr.children.push(value)
  },
  onclosetag: function (name) {
    buffer.pop()
    curr = buffer[buffer.length - 1]
  }
}

function buildArgs (args) {
  return args.split(' ').filter(item => {
    return item.trim()
  }).join(', ')
}

function wrapFn (name, args, value) {
  return `function ${name} (${args}) {
    return ${value}
  }`
}

module.exports = function (tmpl, mode = 'raw', name = 'view', args = 'props state') {
  root = new Root()
  buffer = [root]
  curr = root

  defaultFnName = name
  defaultFnArgs = buildArgs(args)

  const parser = new htmlparser.Parser(handler, {
    decodeEntities: false,
    lowerCaseAttributeNames: false,
    lowerCaseTags: false,
    recognizeSelfClosing: true
  })

  parser.write(tmpl)
  parser.end()

  const js = root.toString()

  let result = ''
  try {
    if (mode === 'raw') {
      result = js
    } else {
      let wrap = false
      let useMode = false

      const children = root.children
      if (children.length === 1) {
        const onlyChild = children[0]

        // Only wrap the output if there's a single root
        // child and that child is not a <function> tag
        if (onlyChild.name !== 'function') {
          wrap = true
        }

        // Only mode the output if there's a single
        // root child and that child is not a <script> tag
        if (onlyChild.name !== 'script') {
          useMode = true
        }
      }

      let value = js

      if (wrap) {
        value = wrapFn(defaultFnName, defaultFnArgs, js)
      }

      if (useMode) {
        switch (mode) {
          case 'esm':
            result = `export default ${value}`
            break
          case 'cjs':
            result = `module.exports = ${value}`
            break
          case 'browser':
            result = `window.${name} = ${value}`
            break
          default:
            result = `${mode ? `var ${mode} =` : ''} ${value}`
        }
      } else {
        result = value
      }
    }

    return standardize.transform(result)
  } catch (err) {
    throw new Error(`Error ${err.message}\n${result}\nraw:\n${js}`)
  }
}

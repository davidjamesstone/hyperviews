const standardize = require('standard-format')
const htmlparser = require('htmlparser2')
const delim = ['{', '}']
const startDelim = delim[0]
const specialEls = ['elseif', 'else']
const specialAttrs = ['if', 'each']

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
  return `(${target} ? (${target}.map ? ${target} : Object.keys(${target})) : [])`
}

function getAttrs (target) {
  const attributes = []

  for (const name in target.attribs) {
    if (specialAttrs.indexOf(name) === -1) {
      const value = target.attribs[name]
      let val = ''
      if (name === 'style') {
        val = value
      } else if (name.startsWith('on')) {
        if (value.startsWith('{') && value.endsWith('}')) {
          val = `function (e) { ${value.slice(1, -1)} }`
        } else {
          val = value
        }
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
    ? `{ ${attributes.map(a => `${a.name}: ${a.value}`).join(', ')} }`
    : '{}'

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

    const node = `h("${this.name}", ${attribs}${childstr ? ', ' + childstr : ''})`
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
      })()`
    } else if ('if' in this.attribs) {
      return `${this.attribs['if']} ? ${node} : undefined`
    } else if ('each' in this.attribs) {
      const eachAttr = this.attribs['each']
      const eachParts = eachAttr.split(' in ')
      const key = eachParts[0]
      const target = eachParts[1]

      return `${getIterator(target)}.map(function($value, $item, $target) {\nconst ${key} = $value\nreturn ${node}\n})`
    } else {
      return node
    }
  }
}

class Root extends Node {
  toString () {
    return this.children.map(c => c.toString()).join('/n')
  }
}

let root, buffer, curr

const handler = {
  onopentag: function (name, attribs) {
    const newCurr = new Node(curr, name, attribs)
    curr.children.push(newCurr)
    buffer.push(newCurr)
    curr = newCurr
  },
  ontext: function (text) {
    if (!text || !text.trim()) {
      return
    }

    text = text.trim()

    const value = text.indexOf(startDelim) > -1
      ? interpolate(text)
      : strify(text)

    curr.children.push(value)
  },
  onclosetag: function (name) {
    buffer.pop()
    curr = buffer[buffer.length - 1]
  }
}

module.exports = function (tmplstr) {
  root = new Root()
  buffer = [root]
  curr = root

  const parser = new htmlparser.Parser(handler, {
    decodeEntities: false,
    lowerCaseAttributeNames: false,
    lowerCaseTags: false
  })

  parser.write(tmplstr)
  parser.end()

  const js = root.toString().trim()
  // console.log(js)

  const standardized = standardize.transform(js)
  // console.log(standardized)

  return standardized
}

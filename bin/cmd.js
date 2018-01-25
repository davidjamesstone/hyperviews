#!/usr/bin/env node

const stdin = process.stdin
const stdout = process.stdout

stdin.setEncoding('utf8')

const hyperviews = require('../')
let buffer = ''

stdin.on('data', (text) => {
  buffer += text
})

stdin.on('end', () => {
  stdout.write(hyperviews(buffer))
})

stdin.resume()

// echo "const view = (state, actions) =>" | cat - <(cat examples/demo-view.html | bin/cmd.js) > examples/demo-view.js

// echo "my standard in" | cat <(echo "prefix... ") <(cat -) <(echo " ...suffix")
#!/usr/bin/env node

const minimist = require('minimist')
const stdin = process.stdin
const stdout = process.stdout
const argv = minimist(process.argv.slice(2))

stdin.setEncoding('utf8')

const hyperviews = require('../')
let tmpl = ''

stdin.on('data', (text) => {
  tmpl += text
})

stdin.on('end', () => {
  stdout.write(hyperviews(tmpl, argv.mode, argv.name, argv.args))
})

stdin.resume()

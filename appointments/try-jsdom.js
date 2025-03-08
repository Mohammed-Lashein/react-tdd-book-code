import { JSDOM } from 'jsdom'
/* Since we are using ESM here, we need to specify type: module
in the package.json file (I got an err in the console stating that) */
const dom = new JSDOM()

const myDiv = dom.window.document.createElement('div')
const p1 = dom.window.document.createElement('p')
const p2 = dom.window.document.createElement('p')

p1.textContent = 'hello p1'
p2.textContent = 'hello p2'

dom.window.document.body.appendChild(p1)
dom.window.document.body.appendChild(p2)
console.log(dom.window.document.body.textContent);
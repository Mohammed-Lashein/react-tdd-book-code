import { JSDOM } from 'jsdom'
const dom = new JSDOM()

/* 
  IMPORTANT 
  Note that if you run this file using node, you will get an
  error because node can't simulate browser APIs, so you need to
  either attach this script to an html file and run it in the
  browser (as I did in this dir) 

  Why did I need to use dispatchEvent in the 1st place ?
  => I thought I needed an alternative for react util
  Simulate.click(), but I found that click simulation provided by
  js is more than enough
*/


const btn = dom.window.document.createElement("button")
// const btn = document.createElement("button")

btn.addEventListener('click', (e) => {
  console.log('did an err occur ?');
  console.log(e.constructor);
  
  console.log(e);
  console.log('you dispatched an e ! ')
}
  
)

const e = new dom.window.MouseEvent('click', {bubbles: true})

btn.click()
btn.dispatchEvent(new Event('click', {bubbles: true}))
console.log(e instanceof Event);

function clickBtn() {
  btn.click()
}
clickBtn()



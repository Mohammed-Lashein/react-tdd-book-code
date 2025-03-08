// import { JSDOM } from 'jsdom'
// const dom = new JSDOM()
// const btn = dom.window.document.createElement("button")
const btn = document.createElement("button")

btn.addEventListener('click', (e) => {

  console.log(e);
  console.log('you dispatched an e ! ')
}
  
)

const e = new Event('click', {bubbles: true})

btn.dispatchEvent(e)
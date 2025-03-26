import { toContainText } from './toContainText'


describe("toContainText Matcher", function() {
  const stripTerminalColor = (text) => 
  text.replace(/\x1B\[\d+m/g, '')

  it("returns pass is true when text is found in the DOM el", function() {
    const domElement = {
      textContent: 'text to find by my handy matcher'
    }
    const res = toContainText(domElement, 'handy')
    console.log('this is res: ');
    
    console.log(res.message());
    
    expect(res.pass).toBe(true)
  })

  it("returns pass is false when text is not found in the DOM el", () => {
    const domElement = {
      textContent: 'text to find by my handy matcher'
    }
    const res = toContainText(domElement, 'not handy')
    expect(res.pass).toBe(false)
  })

  it("returns a message that contains the source line if no match", () => {
    const domElement = {
      textContent: ''
    }
    const res = toContainText(domElement, 'my humble text')
    expect(stripTerminalColor(res.message())).toContain(`expect(element).not.toContainText("my humble text")`)
  })

  it("returns a message that contains the source line if negated match", () => {
    const domElement = {
      textContent: 'my humble code'
    }
    const res = toContainText(domElement, 'my humble text')
    console.log('This is res msg: ');
    console.log(res.message());
    expect(stripTerminalColor(res.message())).toContain(`expect(element).not.toContainText("my humble text")`)
  })
})
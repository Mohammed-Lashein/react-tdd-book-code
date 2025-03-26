import { toHaveClass } from './toHaveClass';

describe("toHaveClass Matcher", function() {
  const stripTerminalColor = (text) => 
  text.replace(/\x1B\[\d+m/g, '')

  it("returns pass is true when class is found in the DOM el", function() {
    const domElement = {
      className: 'class1'
    }
    const res = toHaveClass(domElement, 'class1')
    expect(res.pass).toBe(true)
  })
  
  it("returns pass is false when class is not found in the DOM el", function() {
    const domElement = {
      className: 'class1'
    }
    const res = toHaveClass(domElement, 'yay')
    expect(res.pass).toBe(false)
  })

  it("returns a message that contains the source line if no match", function() {
    const domElement = {
      className: 'class1'
    }
    const res = toHaveClass(domElement, 'yay')
    // console.log(res.message());
    
    expect(stripTerminalColor(res.message())).toContain(
      `expect(element).toHaveClass("yay")`
    )
  })

  it("shows the custom message that contains actual class", () => {
    const domElement = {
      className: 'class1'
    }
    const res = toHaveClass(domElement, 'classic');
    expect(stripTerminalColor(res.message())).toContain(`Actual classes: ["class1"]`)
  })

  it("returns a message with empty array if there are no classes", () => {
    const domElement = {
      className: ''
    }
    const res = toHaveClass(domElement, 'classic');
    expect(stripTerminalColor(res.message())).toContain(`Actual classes: []`)
  })
})
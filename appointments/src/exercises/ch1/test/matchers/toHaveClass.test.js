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
    console.log(res.message());
    
    expect(stripTerminalColor(res.message())).toContain(
      `expect(element).toHaveClass("yay")`
    )
    // expect(true).toBe(true)
  })

})
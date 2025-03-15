

describe("toContainText Matcher", function() {
  const stripTerminalColor = (text) => 
  text.replace(/\x1B\[\d+m/g, '')

  it("returns pass is true when text is found in the DOM el", function() {
    const domElement = {
      textContent: 'text to find by my handy matcher'
    }
    
  })
})
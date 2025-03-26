// Helps us format error messages on creating custom matchers
import { matcherHint, printExpected, printReceived } from 'jest-matcher-utils';

export const toContainText = (receivedDomNode, expectedText) => {
// export const toContainText = (receivedDomNode, paramOnePassedTothisMatcher, paramTwoPassedTothisMatcher) => {

  const pass = receivedDomNode.textContent.includes(expectedText)

  const sourceHint = () => {
    // matcherHint(name, receivedType, expectedType, options)
    return matcherHint('toContainText', 'element', printExpected
      (expectedText), {isNot: !pass})
      // isNot : Jest uses it to know if this matcher is being negated
  }

  const actualTextHint = () => {
    // printReceived, printExpected formats expectedValue for better readability
    return "Actual text: " + printReceived(receivedDomNode.textContent)
  }
  const message = () => 
  [sourceHint(), actualTextHint()].join('\n\n')

// if(pass) {
//   return {
//     pass: true,
//     message: () => 'passed !'
//   }
// } else {
//   return {
//     pass: false,
//     message: () => 'failed !'
//   }
// }
return {pass, message}
};
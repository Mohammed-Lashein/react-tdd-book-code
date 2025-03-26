// Helps us format error messages on creating custom matchers
import { matcherHint, printExpected, printReceived } from 'jest-matcher-utils'

export const toContainText = (receivedDomNode, expectedText) => {
	// export const toContainText = (receivedDomNode, paramOnePassedTothisMatcher, paramTwoPassedTothisMatcher) => {

	const pass = receivedDomNode.textContent.includes(expectedText)

	const sourceHint = () => {
		// matcherHint(name, receivedType, expectedType, options)
		return matcherHint('toContainText', 'element', printExpected(expectedText), { isNot: pass })
		// isNot : Jest uses it to know if this matcher is being negated
    /* Our usage of { isNot: pass } is a bit obscure . 
    How is isNot supposed to be true when the test passes ?!

    After logging values to the console, it seems that this approach is
    correct but needs some explanation . 

    Since when the test fails we display this message : 
    expect(element).toContainText('my amazing text')
    Actual text: ''

    if we made the flag as {isNot : !pass}, then the above message
    will render like : 
    expect(element).not.toContainText('my amazing text')
    Actual text: ''

    This is counterintuitive ! 

    We need {isNot: pass} so that the message is helpful and comprehensible . 

    Even though it is contradicting with jest logic (since we are making
    isNot to true even though we didn't use .not in our code) but it is
    aliging with our custom hint . 
    */
	}

	const actualTextHint = () => {
		// printReceived, printExpected formats expectedValue for better readability
		return 'Actual text: ' + printReceived(receivedDomNode.textContent)
	}
	const message = () => [sourceHint(), actualTextHint()].join('\n\n')

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
	return { pass, message }
}

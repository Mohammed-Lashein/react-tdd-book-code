import { matcherHint, printExpected, printReceived} from 'jest-matcher-utils'
export const toHaveClass = (receivedDomNode, expectedclassName) => {
	const pass = receivedDomNode.className.includes(expectedclassName)

	const sourceHint = () => {
		// matcherHint(name, receivedType, expectedType, options)
		return matcherHint('toHaveClass', 'element', printExpected(expectedclassName), { isNot: pass })
	
		/* The below code will prevent the matching from taking place
		because it will not wrap the value passed to toHaveClass() in the
		test in quotes, thus making the test fail . 
		
		Personally I don't understand why this is happening (printExpected() is supposed to just be a wrapper for chalk.red(), but that's how
		the code is working . )*/
		// return matcherHint('toHaveClass', 'element', expectedclassName, { isNot: pass })
	}

	const actualTextHint = () => {
		return receivedDomNode.className === ''
			? 'Actual classes: ' + printReceived([])
			: 'Actual classes: ' + printReceived(receivedDomNode.className.split(' '))
	}

	const message = () => [sourceHint(), actualTextHint()].join('\n\n')

	return { pass, message }
}

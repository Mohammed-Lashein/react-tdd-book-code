import { matcherHint, printExpected, printReceived} from 'jest-matcher-utils'
export const toHaveClass = (receivedDomNode, expectedclassName) => {
	const pass = receivedDomNode.className.includes(expectedclassName)

	const sourceHint = () => {
		// return matcherHint('toHaveClass', 'element', printExpected(expectedclassName), { isNot: pass })
		return matcherHint('toHaveClass', 'element', expectedclassName, { isNot: pass })
	}

	const actualTextHint = () => {
		receivedDomNode.className === ''
			? 'Actual classes: ' + printReceived([])
			: 'Actual classes: ' + printReceived(receivedDomNode.className.split(' '))
	}

	const message = () => [sourceHint(), actualTextHint()].join('\n\n')

	return { pass, message }
}

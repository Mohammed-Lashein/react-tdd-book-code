import { act } from 'react'
import { createContainer } from '../src/exercises/ch1/test/domManipulators'
import { CustomerForm } from '../src/CustomerForm'
import { fireEvent } from '@testing-library/react'

describe('CustomerForm', () => {
	let render, container

	beforeEach(() => {
		({ render, container } = createContainer())
	})

	const form = (id) => container.querySelector(`form[id=${id}]`)
	const expectToBeInputFieldOfTypeText = (formEl) => {
    /* Since our custom field() function will return undefined in case of element non-
    existence instead of null, we need to check against undefined not null */
		// expect(formEl).not.toBeNull()
		expect(formEl).not.toBeUndefined()
		expect(formEl.tagName).toBe('INPUT')
		expect(formEl.type).toBe('text')
	}
	const field = (name) => {
		const field = form('customer').elements[name]
		return field
	}
	const labelFor = (formEl) => {
		return container.querySelector(`label[for=${formEl}]`)
	}

	it('renders a form', async () => {
		await act(async () => {
			render(<CustomerForm />)
		})
		expect(form('customer')).not.toBeNull()
	})

	// test factories start
	function itRendersAsATextBox(fieldName) {
		it('renders as a text box', async () => {
			await act(async () => {
				render(<CustomerForm />)
			})
			expectToBeInputFieldOfTypeText(field(fieldName))
		})
	}
	function itIncludesExistingValuePassedAsAProp(fieldName, value) {
		it('includes the existing value', async () => {
			await act(async () => {
				/*
          short form of 
          render(<CustomerForm [fieldName] = 'value'/>)
          but the above line would cause an error because wrapping the property in square brackets is not valid js
          */
				render(<CustomerForm original={{...{ [fieldName]: value }}} />)
			})

			expect(field(fieldName).value).toBe(value)
		})
	}
	function itRendersALabelFor(inputName) {
		function createFormattedLabelTextFromInputName() {
			const inputNameTokens = inputName.split('_')
			return inputNameTokens
				.map((token) => {
					const firstTokenLetterCapitalized = token.slice(0, 1).toUpperCase()
					return firstTokenLetterCapitalized + token.slice(1)
				})
				.join(' ')
			// first_name will generate First Name :
		}

		it('renders a label', async () => {
			await act(async () => {
				render(<CustomerForm />)
			})
			expect(labelFor(inputName)).not.toBeNull()
			expect(labelFor(inputName).textContent).toMatch(createFormattedLabelTextFromInputName(inputName))
		})
	}
	function itHasAnIdThatMatchesTheLabelForAttribute(fieldName) {
		it('assigns an id that matches the label id', async () => {
			await act(async () => {
				render(<CustomerForm />)
			})
			expect(field(fieldName).id).toBe(fieldName)
		})
	}
	function itSavesExistingValueOnFormSubmission(fieldName, valueToSaveOnSubmission) {
		it('saves existing value when submitted', async () => {
			expect.hasAssertions()
			await act(async () => {
				render(
					<CustomerForm
						original={{[fieldName]: valueToSaveOnSubmission}}
						onSubmit={(customer) => expect(customer[fieldName]).toBe(valueToSaveOnSubmission)}
					/>
				)
			})

			await act(async () => {
				form('customer').dispatchEvent(new Event('submit', { bubbles: true }))
			})
		})
	}
	function itSubmitsNewValue(fieldName, newValue) {
		it('saves new value to state when submitted', async () => {
			expect.hasAssertions()
			await act(async () => {
				render(
					<CustomerForm
						{...{ [fieldName]: 'existingValue' }}
						onSubmit={(customer) => {
							expect(customer[fieldName]).toBe(newValue)
						}}
					/>
				)
			})

			fireEvent.change(field(fieldName), { target: { value: newValue } })

			await act(async () => {
				// logs a warning
				// form('customer').submit()
				// more verbose but works
				form('customer').dispatchEvent(new Event('submit', { bubbles: true }))
			})
		})
	}

	// test factories end
	describe('first name field', () => {
		itRendersAsATextBox('first_name')
		itIncludesExistingValuePassedAsAProp('first_name', 'myFirstName')
		itRendersALabelFor('first_name')
		itHasAnIdThatMatchesTheLabelForAttribute('first_name')
		itSavesExistingValueOnFormSubmission('first_name', 'Jordan')
		itSubmitsNewValue('first_name', 'myNewVal')
	})
  describe("last name field", () => {
    itRendersAsATextBox('last_name')
    itIncludesExistingValuePassedAsAProp('last_name', "myLastName")
    itRendersALabelFor('last_name')
    itHasAnIdThatMatchesTheLabelForAttribute('last_name')
    itSavesExistingValueOnFormSubmission('first_name', 'Jordan')
    itSubmitsNewValue('last_name', 'myNewVal')
  })
})

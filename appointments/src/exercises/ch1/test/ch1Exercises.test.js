import React from 'react'
// I want to know what error will appear when I don't import
// react
// Reference Error : React is not defined (this error is thrown
// when the iterpreter reaches the <Appointment .. probably
// because now babel con't do its work)
import { createRoot } from 'react-dom/client'
import { Appointment, AppointmentsDayView } from '../ExerciseAppointmentsDayView'
import { StrictMode } from 'react'
import { act } from 'react'
import { appointmentTable, element, initializeReactContainer, render } from './reactTestExtensions'

beforeEach(() => {
	initializeReactContainer()
})

describe('Exercise Appointment', function () {
	const testAppointment = {
		customer: {
			firstName: 'AB',
			lastName: 'cd',
			phoneNumber: '123-456-789',
		},
		notes: 'abcdefg',
		service: 'salon',
		startsAt: 1741590004754, // 9 am
		stylist: 'The amazing stylist',
	}

	it('renders a table', async function () {
		await act(async () => {
			render(<Appointment appointment={{}} />)
		})
		expect(element('table')).not.toBeNull()
	})

	it('renders customer first name', async function () {
		const appointment = {
			customer: {
				firstName: 'Ashley',
			},
		}
		await act(async () => {
			render(<Appointment appointment={appointment} />)
		})
		expect(appointmentTable()).toContainText("Ashley")
	})

	it('renders another customer first name', async () => {
		const appointment = {
			customer: {
				firstName: 'Jordan',
			},
		}
    await act(async () => {
      render(<Appointment appointment={appointment}/>)
    })
    expect(appointmentTable()).toContainText("Jordan")
	})

	it.skip('renders customer last name', async function () {
		const appointment = {
			customer: {
				lastName: 'Jones',
			},
		}
		await act(async () => {
			render(<Appointment appointment={appointment} />)
		})
		expect(container.textContent).toMatch('Jones')
	})

	it.skip('renders another customer last name', async () => {
		const appointment = {
			customer: {
				firstName: 'smith',
			},
		}
    await act(async () => {
      render(<Appointment appointment={appointment}/>)
    })
    expect(container.textContent).toMatch('smith')
	})

	it.skip("displays customer's full name", async function () {
    const appointment = {
      customer: {
        firstName: 'AB',
        lastName: 'cd'
      }
    }
		await act(async () => {
			render(<Appointment appointment={appointment} />)
		})

		expect(container.textContent).toMatch('AB cd')
	})

  it.skip('renders customer phone number', async () => {
    const appointment = {
      customer: {
        phoneNumber: '123456789'
      }
    }
    await act(async () => {
      render(<Appointment appointment={appointment}/>)
    })

    expect(container.textContent).toMatch('123456789')
  })
})

describe('AppointmentsDayView Exercises', function () {
	let container = document.createElement('div')
	beforeEach(() => {
		container = document.createElement('div')
		/* If you moved this  beforeEach block to outside, you will
      get a referenceError */
	})

	const render = (component) => {
		const root = createRoot(container)
		root.render(<StrictMode>{component}</StrictMode>)
	}

	test.todo('some stuff')
})

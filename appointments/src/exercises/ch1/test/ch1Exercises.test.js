import React from 'react'
import { Appointment, AppointmentsDayView } from '../ExerciseAppointmentsDayView'
import { act } from 'react'
import { appointmentTable, element, render } from './reactTestExtensions'

/* The writer provided this piece of code, even though the tests passed
after commenting it out . 

The reason for tests pass is that in the render() we call the
initializeReactContainer(), so technically it will be called before
our assertions . 
*/

// beforeEach(() => {
// 	initializeReactContainer()
// })

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
		expect(appointmentTable()).toContainText('Ashley')
	})

	it('renders another customer first name', async () => {
		const appointment = {
			customer: {
				firstName: 'Jordan',
			},
		}
		await act(async () => {
			render(<Appointment appointment={appointment} />)
		})
		expect(appointmentTable()).toContainText('Jordan')
	})

	it('renders customer last name', async function () {
		const appointment = {
			customer: {
				lastName: 'Jones',
			},
		}
		await act(async () => {
			render(<Appointment appointment={appointment} />)
		})
		expect(appointmentTable()).toContainText('Jones')
	})

	it('renders another customer last name', async () => {
		const appointment = {
			customer: {
				firstName: 'smith',
			},
		}
		await act(async () => {
			render(<Appointment appointment={appointment} />)
		})
		expect(appointmentTable()).toContainText('smith')
	})

	it("displays customer's full name", async function () {
		const appointment = {
			customer: {
				firstName: 'AB',
				lastName: 'cd',
			},
		}
		await act(async () => {
			render(<Appointment appointment={appointment} />)
		})

		expect(appointmentTable()).toContainText('AB cd')
	})

	it('renders customer phone number', async () => {
		const appointment = {
			customer: {
				phoneNumber: '123456789',
			},
		}
		await act(async () => {
			render(<Appointment appointment={appointment} />)
		})

		expect(appointmentTable()).toContainText('123456789')
	})
})

describe('AppointmentsDayView Exercises', function () {})

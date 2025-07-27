import React from 'react'
import { ExerciseAppointmentsDayView } from '../components/ExerciseAppointmentsDayView'
import { act } from 'react'
import { ExerciseAppointment } from "../components/ExerciseAppointment"
import {
	appointmentTable,
	element,
	elements,
	initializeReactContainer,
	render,
	textOf,
	typesOf,
} from './reactTestExtensions'

/* The writer provided this piece of code, even though the tests passed
after commenting it out . 

The reason for tests pass is that in the render() we call the
initializeReactContainer(), so technically it will be called before
our assertions . 
*/

// beforeEach(() => {
// 	initializeReactContainer()
// })

/* 
	The writer moved every act() call inside the render function . 
	This is intuitive and is drier (clean code DRY principle) . 
	But it took me an hour or two at the beginning of ch1 to discover how 
	it works as the act() the writer is using is deprecated so I went to
	see how the one present now in react core package works . 

	I am repeating act() call in every test just to memorize how to
	use act() and remember the frustration on learning its syntax !
*/

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
			render(<ExerciseAppointment appointment={{}} />)
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
			render(<ExerciseAppointment appointment={appointment} />)
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
			render(<ExerciseAppointment appointment={appointment} />)
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
			render(<ExerciseAppointment appointment={appointment} />)
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
			render(<ExerciseAppointment appointment={appointment} />)
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
			render(<ExerciseAppointment appointment={appointment} />)
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
			render(<ExerciseAppointment appointment={appointment} />)
		})

		expect(appointmentTable()).toContainText('123456789')
	})

	it('renders another customer phone number', async () => {
		const appointment = {
			customer: {
				phoneNumber: '234567890',
			},
		}
		await act(async () => {
			render(<ExerciseAppointment appointment={appointment} />)
		})

		expect(appointmentTable()).toContainText('234567890')
	})

	it('renders the stylist name', async () => {
		const appointment = {
			stylist: 'sam',
		}
		await act(async () => {
			render(<ExerciseAppointment appointment={appointment} />)
		})
		expect(appointmentTable()).toContainText('sam')
	})

	it('renders another the stylist name', async () => {
		const appointment = {
			stylist: 'Jo',
		}
		await act(async () => {
			render(<ExerciseAppointment appointment={appointment} />)
		})
		expect(appointmentTable()).toContainText('Jo')
	})
	it('renders the salon services', async () => {
		const appointment = {
			service: 'Cut',
		}
		await act(async () => {
			render(<ExerciseAppointment appointment={appointment} />)
		})
		expect(appointmentTable()).toContainText('Cut')
	})

	it('renders another salon service', async () => {
		const appointment = {
			stylist: 'Blow-dry',
		}
		await act(async () => {
			render(<ExerciseAppointment appointment={appointment} />)
		})
		expect(appointmentTable()).toContainText('Blow-dry')
	})

	it('renders the appointment notes', async () => {
		const appointment = {
			notes: 'abc',
		}
		await act(async () => {
			render(<ExerciseAppointment appointment={appointment} />)
		})
		expect(appointmentTable()).toContainText('abc')
	})

	it('renders other appointment notes', async () => {
		const appointment = {
			notes: 'def',
		}
		await act(async () => {
			render(<ExerciseAppointment appointment={appointment} />)
		})
		expect(appointmentTable()).toContainText('def')
	})

	it('renders an h2 element to diplay the title of the component', async () => {
		await act(async () => {
			render(<ExerciseAppointment appointment={{}} />)
		})
		expect(element('h2')).not.toBeNull()
	})

	it('renders appointment time in the heading', async () => {
		const today = new Date()
		const timestamp = today.setHours(9, 0, 0)
		const appointment = {
			startsAt: timestamp,
		}
		await act(async () => {
			render(<ExerciseAppointment appointment={appointment} />)
		})

		expect(element('h2')).toContainText("Today's appointment at 09:00")
	})
})

describe('AppointmentsDayView Exercises', function () {
	const today = new Date()
	const twoAppointments = [
		{
			startsAt: today.setHours(12, 0),
			customer: {
				firstName: 'Ashley',
			},
		},
		{
			startsAt: today.setHours(13, 0),
			customer: {
				firstName: 'Jordan',
			},
		},
	]

	beforeEach(() => initializeReactContainer())
	/*
	secondButton is a function instead of just the query selector 
	because using the latter will return undefined (because the dom 
	hasn't been constructed yet) 

	That's why the writer wrote it as a fn
	*/
	const secondButton = () => elements('button')[1]


	it('renders a div with the correct id', async () => {
		await act(async () => {
			render(<ExerciseAppointmentsDayView appointments={[]} />)
		})
		expect(element('div#appointmentsDayView')).not.toBeNull()
	})

	it('renders a ul to display appointments', async () => {
		await act(async () => {
			render(<ExerciseAppointmentsDayView appointments={twoAppointments} />)
		})
		expect(element('div#appointmentsDayView ul')).not.toBeNull()
	})

	it('renders an li for each appointment', async () => {
		await act(async () => {
			render(<ExerciseAppointmentsDayView appointments={twoAppointments} />)
		})
		expect(elements('div#appointmentsDayView ul li')).toHaveLength(2)
	})

	it('renders the time of each appointment', async () => {
		await act(async () => {
			render(<ExerciseAppointmentsDayView appointments={twoAppointments} />)
		})
		expect(textOf(elements('li'))).toEqual(['12:00', '13:00'])
	})

	it('initially shows a message saying there are no appointments today', async () => {
		await act(async () => {
			render(<ExerciseAppointmentsDayView appointments={[]} />)
		})
		expect(element('div#appointmentsDayView')).toContainText('no appointments')
	})

	it('selects the 1st appointment by default', async () => {
		await act(async () => {
			render(<ExerciseAppointmentsDayView appointments={twoAppointments} />)
		})
		expect(document.body).toContainText('Ashley')
	})

	it('has a button el in each li', async () => {
		await act(async () => {
			render(<ExerciseAppointmentsDayView appointments={twoAppointments} />)
		})
		expect(typesOf(elements('li > *'))).toEqual(['button', 'button'])
	})
	it("renders another appointment when selected", async () => {
			/* 
			Trying to jam all of the dom logic in the same act() call will
			not work . 

			You need to first await render() then select the elements from 
			the dom . 
			 */		
		await act(async () => {
			render(<ExerciseAppointmentsDayView appointments={twoAppointments} />)
		})
		await act(async () => {
			secondButton().click()
		})
		expect(document.body).toContainText('Jordan')
	})

	it("adds active class to button when selected", async () => {
		await act(async () => {
			render(<ExerciseAppointmentsDayView appointments={twoAppointments} />)
		})
		await act(async () => {
			secondButton().click()
		})
		// At first I used toEqual, and it were wrong because the el 
		// surely has other classes other than active
		expect(secondButton().className).toMatch('active')
	})

	it("doesn't add active class if button is not selected", async() => {
		await act(async () => {
			render(<ExerciseAppointmentsDayView appointments={twoAppointments} />)
		})
		
		expect(secondButton().className).not.toMatch('active')
	})
})

import React from 'react'
// I want to know what error will appear when I don't import
// react
// Reference Error : React is not defined (this error is thrown
// when the iterpreter reaches the <Appointment .. probably
// because now babel con't do its work)
import { createRoot } from 'react-dom/client'
import { Appointment, AppointmentsDayView } from '../../src/AppointmentsDayView'
import { StrictMode } from 'react'
import { act } from 'react'

describe("Appointment exercises", function() {
  const appointment = {
    customer: {
      firstName: "AB",
      lastName: 'cd',
      phoneNumber: '123-456-789'
    },
    notes: 'abcdefg',
    service: 'salon',
    startsAt: 1741590004754, // 9 am
    stylist: "The amazing stylist"
  }
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

  test("has a table tag", async function() {
    await act(async () => {
      render(<Appointment appointment={appointment}/>)
    })

    expect(container.querySelector('table')).toHaveLength(1)
  })
})

describe("AppointmentsDayView Exercises", function() {
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

    test.todo("some stuff")
  
})

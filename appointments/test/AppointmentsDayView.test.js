import React from 'react'
// I want to know what error will appear when I don't import
// react
// Reference Error : React is not defined (this error is thrown
// when the iterpreter reaches the <Appointment .. probably
// because now babel con't do its work)
import { createRoot } from 'react-dom/client'
import { Appointment, AppointmentsDayView } from '../src/AppointmentsDayView'
import { StrictMode } from 'react'
import { act } from 'react'

/**
 * @jest-environment jsdom
 */

describe('Appointment', () => {
	let container
	let customer

	beforeEach(() => {
		container = document.createElement('div')
		/* If you moved this  beforeEach block to outside, you will
    get a referenceError */
	})

	const render = (component, container) => {
		const root = createRoot(container)
		root.render(<StrictMode>{component}</StrictMode>)
	}
	it('renders the customer 1st name', async () => {
		customer = { firstName: 'Ashley' }
		const component = <Appointment customer={customer} />
		container = document.createElement('div')
		container.id = 'myRoot'

		// const root = createRoot(container)
		await act(async () => {
			/* 
      Using root.render first or appending container to body first 
      does not matter . 
      The code works either way .
      */
			// root.render(
			//   <StrictMode>
			//     {component}
			//   </StrictMode>
			// )

			render(component, container)
		})
		expect(container.textContent).toMatch('Ashley')
	})

	it('renders another customer 1st name', async () => {
		customer = { firstName: 'Jordan' }
		const component = <Appointment customer={customer} />
		container = document.createElement('div')
		container.id = 'myRoot'

		await act(async () => {
			render(component, container)
		})
		expect(container.textContent).toMatch('Jordan')
	})
})

describe("AppointmentsDayView", () => {
  /* Since I want to remove the need of passing the component
  every time to render fn, I will declare the container here
  instead of not assigning a value to it  */
  let container = document.createElement('div')
  const today = new Date
  const appointments = [
    {
      startsAt: today.setHours(12,0),
      customer: {
        firstName: "Ashley"
      }
    },
    {
      startsAt: today.setHours(13,0),
      customer: {
        firstName: "Jordan"
      }
    },
  ]

	beforeEach(() => {
		container = document.createElement('div')
		/* If you moved this  beforeEach block to outside, you will
    get a referenceError */
	})

	const render = (component) => {
		const root = createRoot(container)
		root.render(<StrictMode>{component}</StrictMode>)
	}

  it("renders a div with the right id", async () => {
    await act(async () => {

      render(<AppointmentsDayView appointments={[]}/>)
		})
    expect(container.querySelector('div#appointmentsDayView')).not.toBeNull()
  })

  it("renders multiple appointments in an ol el", async() => {

    await act(async () => {
      render(<AppointmentsDayView appointments={appointments}/>)
    })

    expect(container.querySelector('ol')).not.toBeNull()
    expect(container.querySelector('ol')).not.toBeNull()
  })

  it("renders each appointment in an li", async() => {

    await act(async () => {
      render(<AppointmentsDayView appointments={appointments}/>)
    })

    expect(container.querySelectorAll('li')).toHaveLength(2)
    expect(container.querySelectorAll('li')[0].textContent).toBe('12:00')
    expect(container.querySelectorAll('li')[1].textContent).toBe('13:00')
  })

  it("initially shows a message that there are no appointments today", async() => {
    await act(async () => {
      render(<AppointmentsDayView appointments={[]}/>)
    })

    expect(container.textContent).toMatch("There are no appointments scheduled for today")
  })

  it("selects 1st appointment by default", async () => {
    await act(async () => {
      render(<AppointmentsDayView appointments={appointments}/>)
    })

    expect(container.textContent).toMatch('Ashley')
  })

  it("has a button element in each li", async () => {

    await act(async () => {
      render(<AppointmentsDayView appointments={appointments} />
    )
    })

    expect(container.querySelectorAll("li > button")).toHaveLength(2)
    expect(container.querySelectorAll("li > button")[0].type).toBe('button')
  })

  it("renders another appointment when selected", async () => {

    await act(async () => {
      render(<AppointmentsDayView appointments={appointments}/>)
    })

    const btn = container.querySelectorAll('button')[1]
    // console.log(`This is btn : ${btn}`);

    await act(async () => {
      /*  
      IMPORTANT
      You should wrap the btn.click() in act() otherwise the
      effect of the click won't get caught by jest and the test
      would fail . 

      If we used RTL we would not need to write all of these
      act()s, but I actually learned a lot by stumbling into
      these low configuration stuff
      */
      btn.click()
    })

    expect(container.textContent).toMatch("Jordan")
  })
})


/* If you want to run node debugger .
Maybe you can try it some other day */
// node --inspect-brk node_modules/.bin/jest --runInBand

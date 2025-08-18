import { createContainer } from '../src/exercises/ch1/test/domManipulators';
import {AppointmentForm} from '../src/AppointmentForm.js'

describe("AppointmentForm", () => {
  let render, container
  beforeEach(() => {
    ;({render, container} = createContainer())
  })

  const form = (id) => container.querySelector(`form[id=${id}]`)

  it("renders a form", async () => {
    await render(<AppointmentForm/>)
    expect(form("appointment")).not.toBeNull()
  })
  
  describe("service field", () => {
    const field = name => form('appointment').elements[name]
    it("renders as a select box", async () => {
      await render(<AppointmentForm />)

      expect(field('service')).not.toBeNull()
      expect(field('service').tagName).toEqual("SELECT")
    })
    it("initially has a blank value chosen", async () => {
      await render(<AppointmentForm />)

      const firstNode = field('service').children[0]
      expect(firstNode.value).toBe('')
      expect(firstNode.selected).toBeTruthy()
    })
    it("lists all salon services", async () => {
      const services = ['service1', 'service2']
      await render(<AppointmentForm services={services}/>)
      const firstOptionElementWhoseValueIsAnEmptyString = 1

      expect(field('service').children.length).toBe(services.length + firstOptionElementWhoseValueIsAnEmptyString) // My approach.. simple

      // The book's approach
      const optionNodes = Array.from(field('service').children)
      const renderedServices = optionNodes.map((node) => node.textContent)

      // I have some explanation for the arrayContaining() matcher in ch2.md 
      expect(renderedServices).toEqual(expect.arrayContaining(services))
    })

    const findOption = (dropdownNode, optionToSelect) => {
      const options = Array.from(dropdownNode.children)      
      return options.find((option) => option.textContent === optionToSelect)
    }
    it("preselects an existing value", async () => {
      const services = ['service1', 'service2']
      await render(<AppointmentForm services={services} selectedService={"service2"}/>)

      expect(findOption(field('service'), 'service2').selected).toBeTruthy()
    })

    // to be wrapped each in a fn as we did in CustomerForm.test.js
    const labelFor = (formEl) => container.querySelector(`label[for=${formEl}]`)
    it("renders a label", async () => {
      await render(<AppointmentForm />)

      expect(labelFor('service')).not.toBeNull()
    })

    it("has an id that matches the label id", async () => {
      await render(<AppointmentForm />)
      expect(field("service").id).toEqual("service")
    })

    it("saves existing value when submitted", async () => {
      expect.hasAssertions()
      
      const services = ['service1', 'service2']
      await render(
      <AppointmentForm services={services} onSubmit={(service) => expect(service).toEqual("")}/>
      )

      // you may need to wrap the selector in render() in order for react to catch the submit event
      // Update: Oh! The test passed without needing to wrap form("appointment") in an await render()
      form("appointment").dispatchEvent(new Event("submit", {bubbles: true}))
    })

    it("saves new value when submitted", async () => {
      expect.hasAssertions()

      const services = ['service1', 'service2']
      await render(
      <AppointmentForm services={services} selectedService={"service2"}  onSubmit={(service) => expect(service).toEqual("service2")}/>
      )

      form("appointment").dispatchEvent(new Event("submit", {bubbles: true}))
    })

  it("has a submit button", async () => {
    await render(<AppointmentForm />)

    expect(container.querySelector("input[type='submit']")).not.toBeNull()
  })
  })

  describe("timeslot table", () => {
    const timeslotTable = () => container.querySelector("table#timeslots")
    const startsAtField = (index) => container.querySelectorAll("input[name='startsAt']")[index]
    it("renders a table for time slots", async () => {
      await render(<AppointmentForm />)

      expect(timeslotTable()).not.toBeNull()
    })
    it("renders an appointment for every half an hour between open and close times", async () => {
      await render(<AppointmentForm salonOpensAt={9} salonClosesAt={11}/>)
      const timesInDay = timeslotTable().querySelectorAll("tbody >* th")

      expect(timesInDay).toHaveLength(4)
      expect(timesInDay[0].textContent).toEqual("09:00")
      expect(timesInDay[1].textContent).toEqual("09:30")
      expect(timesInDay[3].textContent).toEqual("10:30")

    })
    it("renders an empty cell at the start of the header row", async () => {
      await render(<AppointmentForm salonOpensAt={9} salonClosesAt={11}/>)
      const firstRow = timeslotTable().querySelector('thead > tr')
      expect(firstRow.firstChild.textContent).toBe('')
    })
    it("displays seven days of the week starting from today", async () => {
      const todayTimestamp = Date.now()
      const today = new Date()
        .toDateString() // Sun Aug 10 2025
        .split(" ")[0]

      await render(<AppointmentForm salonOpensAt={9} salonClosesAt={11} todayTimestamp={todayTimestamp}/>)

      const weekDays = timeslotTable().querySelectorAll('thead th:not(:first-child)')

      expect(weekDays).toHaveLength(7)
      expect(weekDays[0].textContent).toEqual(today)
    })
    it("renders a radio button for each timeslot", async () => {
      const today = new Date()
      const availableTimeSlots = [
        {startsAt: today.setHours(9,0,0,0)},
        {startsAt: today.setHours(9,30,0,0)},
        {startsAt: today.setHours(11,0,0,0)},
      ]

      await render(<AppointmentForm todayTimestamp={today} availableTimeSlots={availableTimeSlots}/>)
      const cells = timeslotTable().querySelectorAll('td')

      expect(cells[0].querySelector("input[type='radio']")).not.toBeNull()
      expect(cells[7].querySelector("input[type='radio']")).not.toBeNull()
    })
    it("doesn't render radio buttons for unavailable timeslots", async () => {
      await render(<AppointmentForm availableTimeSlots={[]}/>)

      const timesOfDay = timeslotTable().querySelectorAll('input')
      
      expect(timesOfDay).toHaveLength(0)
    })
    it("sets radio button values to the startsAt value of the corresponding appointment", async () => {
      const today = new Date()
      const availableTimeSlots = [
        {startsAt: today.setHours(9,0,0,0)},
        {startsAt: today.setHours(9,30,0,0)},
      ]

      await render(<AppointmentForm todayTimestamp={today} availableTimeSlots={availableTimeSlots}/>)

      expect(startsAtField(0).value).toEqual(availableTimeSlots[0].startsAt.toString())
      expect(startsAtField(1).value).toEqual(availableTimeSlots[1].startsAt.toString())
    })
  })
})
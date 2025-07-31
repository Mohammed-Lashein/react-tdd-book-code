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
})
import { act } from 'react';
import { createContainer } from '../src/exercises/ch1/test/domManipulators';
import { CustomerForm } from '../src/CustomerForm';
import {fireEvent} from "@testing-library/react"

describe("CustomerForm", () => {
  let render,container

  beforeEach(() => {
    ({render, container} = createContainer())
  })

  const form = (id) => container.querySelector(`form[id=${id}]`)
  const expectToBeInputFieldOfTypeText = (formEl) => {
    expect(formEl).not.toBeNull()
    expect(formEl.tagName).toBe("INPUT")
    expect(formEl.type).toBe("text")
  }
  const firstNameField = () => {
    const field = form('customer').elements.first_name
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

  it('renders the first name field as a text box', async () => {
    await act(async () => {
      render(<CustomerForm />)
    })
    const field = form('customer').elements.first_name
    expectToBeInputFieldOfTypeText(field)
  })

  it("includes the existing value for the first name", async () => {
    const firstName = 'Ashley'
    await act(async () => {
      render(<CustomerForm firstName={firstName}/>)
    })
  
    expect(firstNameField().value).toBe("Ashley")
  })

  it('renders a label for the first name form field', async () => {
    await act(async () => {
      render(<CustomerForm />)
    })
    expect(labelFor('first_name')).not.toBeNull()
    expect(labelFor('first_name').textContent).toBe('First name:')
  })
  it("assigns an id that matches the label id to the first name field", async() => {
    await act(async () => {
      render(<CustomerForm />)
    })
    expect(firstNameField().id).toBe('first_name')
  })

  it("saves existing first name when submitted", async () => {
    expect.hasAssertions()
    await act(async () => {
      render(<CustomerForm firstName='Ashley' onSubmit={({firstName}) => expect(firstName).toBe('Ashley')}/>)
    })

    await act(async () => {
      form('customer').dispatchEvent(
        new Event('submit', {bubbles: true})
      )
    })
  })

  it("saves new first name to state when submitted", async () => {
    expect.hasAssertions()
    await act(async () => {
      render(<CustomerForm firstName='Ashley' onSubmit={(customer) => {
        expect(customer.firstName).toBe('Jamie')
      }}/>)
    })


    // A failed approach ! Don't use it 

    // await act(async () => {
    //   /* Since we are not using react utils, we will manually change
    //   the input value then dispatch an event about that  */
    //   firstNameField().value = 'Jamie'
    //   firstNameField().dispatchEvent(new Event('change', {
    //     bubbles: true
    //   }))
    //   // form('customer').submit()
    // })

    /* React didn't call the onChange handler when we dispatched a synthetic event using
    the browser's native dispatchEvent() . 
    
    So it is better to use RTL and rely on their abstractions other than trying to
    reinvent the wheel !
    */
    await act(async () => {
      fireEvent.change(firstNameField(), {target: {value: "Jamie"}})

    })

    await act(async () => {
      form('customer').submit()
      // more verbose
      // form('customer').dispatchEvent(new Event('submit', {bubbles: true}))
    })
  })
})
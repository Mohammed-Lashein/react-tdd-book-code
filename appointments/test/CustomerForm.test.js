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
      field(fieldName)
      expectToBeInputFieldOfTypeText(field(fieldName))
    })
  }
  function itIncludesExistingValue(fieldName) {
    it("includes the existing value", async () => {
      await act(async () => {
        render(<CustomerForm {... {[fieldName]: 'value'}}/>)
      })
    
      expect(field(fieldName).value).toBe("value")
    })
  }
  // test factories end
  describe('first name field', () => {
    
    itRendersAsATextBox('first_name')
    itIncludesExistingValue('first_name')
  
    it('renders a label', async () => {
      await act(async () => {
        render(<CustomerForm />)
      })
      expect(labelFor('first_name')).not.toBeNull()
      expect(labelFor('first_name').textContent).toBe('First name:')
    })
    it("assigns an id that matches the label id", async() => {
      await act(async () => {
        render(<CustomerForm />)
      })
      expect(field('first_name').id).toBe('first_name')
    })
  
    it("saves existing value when submitted", async () => {
      expect.hasAssertions()
      await act(async () => {
        render(<CustomerForm first_name='Ashley' onSubmit={({first_name}) => expect(first_name).toBe('Ashley')}/>)
      })
  
      await act(async () => {
        form('customer').dispatchEvent(
          new Event('submit', {bubbles: true})
        )
      })
    })
  
    it("saves new value to state when submitted", async () => {
      expect.hasAssertions()
      await act(async () => {
        render(<CustomerForm first_name='Ashley' onSubmit={(customer) => {
          expect(customer.first_name).toBe('Jamie')
        }}/>)
      })
  
      fireEvent.change(field('first_name'), {target: {value: "Jamie"}})
  
      await act(async () => {
        // logs a warning 
        // form('customer').submit()
        // more verbose but works 
        form('customer').dispatchEvent(new Event('submit', {bubbles: true}))
      })
    })
  })


})
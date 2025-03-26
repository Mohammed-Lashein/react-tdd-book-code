import { act } from 'react';
import { createContainer } from '../src/exercises/ch1/test/domManipulators';
import { CustomerForm } from '../src/CustomerForm';


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
})
import { act } from 'react';
import { createContainer } from '../src/exercises/ch1/test/domManipulators';


describe("CustomerForm", () => {
  let render,container

  beforeEach(() => {
    ({render, container} = createContainer())
  })

  it('renders a form', async () => {
    await act(async () => {
      render(<CustomerForm />)
    })
    expect(container.querySelector("form[id='customer']")).not.toBeNull()
  })
})
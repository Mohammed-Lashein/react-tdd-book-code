import React from "react"
// I want to know what error will appear when I don't import
// react
// Reference Error : React is not defined (this error is thrown
// when the iterpreter reaches the <Appointment .. probably
// because now babel con't do its work)
import ReactDOM from 'react-dom'
import {createRoot} from 'react-dom/client'
import {Appointment} from "../src/Appointment"
import { StrictMode } from 'react'
import { act } from 'react'
/**
 * @jest-environment jsdom
 */
describe("Appointment", () => {
  it('renders the customer 1st name', async () => {
    const customer = {firstName: "Ashley"}
    const component = <Appointment customer={customer}/>
    const container = document.createElement("div")
    container.id = 'myRoot'

    const root = createRoot(container)
    await act(async () => {

      /* 
      Using root.render first or appending container to body first 
      does not matter . 
      The code works either way .
      */
      root.render(
        <StrictMode>
          {component}
        </StrictMode>
      )  
    })
    document.body.appendChild(container)
    // ReactDOM.render(component, container)
    expect(document.body.textContent).toMatch('Ashley')
  })

})
import { act } from "react"
import { createContainer } from "../src/exercises/ch1/test/domManipulators"
import { CustomerForm } from "../src/CustomerForm"
import { fireEvent } from "@testing-library/react"

describe("CustomerForm", () => {
  let render, container

  beforeEach(() => {
    ;({ render, container } = createContainer())
  })

  const form = (id) => container.querySelector(`form[id=${id}]`)
  const expectToBeInputFieldOfTypeText = (formEl) => {
    /* Since our custom field() function will return undefined in case of element non-
    existence instead of null, we need to check against undefined not null */
    // expect(formEl).not.toBeNull()
    expect(formEl).not.toBeUndefined()
    expect(formEl.tagName).toBe("INPUT")
    expect(formEl.type).toBe("text")
  }
  const field = (name) => {
    const field = form("customer").elements[name]
    return field
  }
  const labelFor = (formEl) => {
    return container.querySelector(`label[for=${formEl}]`)
  }

  it("renders a form", async () => {
    await render(<CustomerForm />)
    expect(form("customer")).not.toBeNull()
  })

  // test factories start
  function itRendersAsATextBox(fieldName) {
    it("renders as a text box", async () => {
      await render(<CustomerForm />)
      expectToBeInputFieldOfTypeText(field(fieldName))
    })
  }
  function itIncludesExistingValuePassedAsAProp(fieldName, value) {
    it("includes the existing value", async () => {
      await render(<CustomerForm original={{ ...{ [fieldName]: value } }} />)

      expect(field(fieldName).value).toBe(value)
    })
  }
  function itRendersALabelFor(inputName) {
    function createFormattedLabelTextFromInputName() {
      const inputNameTokens = inputName.split("_")
      return inputNameTokens
        .map((token) => {
          const firstTokenLetterCapitalized = token.slice(0, 1).toUpperCase()
          return firstTokenLetterCapitalized + token.slice(1)
        })
        .join(" ")
      // first_name will generate First Name :
    }

    it("renders a label", async () => {
      await render(<CustomerForm />)

      expect(labelFor(inputName)).not.toBeNull()
      expect(labelFor(inputName).textContent).toMatch(createFormattedLabelTextFromInputName(inputName))
    })
  }
  function itHasAnIdThatMatchesTheLabelForAttribute(fieldName) {
    it("assigns an id that matches the label id", async () => {
      await render(<CustomerForm />)

      expect(field(fieldName).id).toBe(fieldName)
    })
  }
  function itSavesExistingValueOnFormSubmission(fieldName, valueToSaveOnSubmission) {
    it("saves existing value when submitted", async () => {
      expect.hasAssertions()

      await render(
        <CustomerForm
          original={{ [fieldName]: valueToSaveOnSubmission }}
          onSubmit={(customer) => expect(customer[fieldName]).toBe(valueToSaveOnSubmission)}
        />
      )

      await render(form("customer").dispatchEvent(new Event("submit", { bubbles: true })))
    })
  }
  function itSubmitsNewValue(fieldName, newValue) {
    it("saves new value to state when submitted", async () => {
      expect.hasAssertions()
      await render(
        <CustomerForm
          original={{ ...{ [fieldName]: "existingValue" } }}
          onSubmit={(customer) => {
            expect(customer[fieldName]).toBe(newValue)
          }}
        />
      )
      fireEvent.change(field(fieldName), { target: { value: newValue } })

      await render(form("customer").dispatchEvent(new Event("submit", { bubbles: true })))
    })
  }
  // test factories end
  
  describe("first name field", () => {
    itRendersAsATextBox("first_name")
    itIncludesExistingValuePassedAsAProp("first_name", "myFirstName")
    itRendersALabelFor("first_name")
    itHasAnIdThatMatchesTheLabelForAttribute("first_name")
    itSavesExistingValueOnFormSubmission("first_name", "Jordan")
    itSubmitsNewValue("first_name", "myNewVal")
  })
  describe("last name field", () => {
    itRendersAsATextBox("last_name")
    itIncludesExistingValuePassedAsAProp("last_name", "myLastName")
    itRendersALabelFor("last_name")
    itHasAnIdThatMatchesTheLabelForAttribute("last_name")
    itSavesExistingValueOnFormSubmission("first_name", "Jordan")
    itSubmitsNewValue("last_name", "myNewVal")
  })
  describe("phone number field", () => {
    itRendersAsATextBox("phone_number")
    itIncludesExistingValuePassedAsAProp("phone_number", "12345")
    itRendersALabelFor("phone_number")
    itHasAnIdThatMatchesTheLabelForAttribute("phone_number")
    itSavesExistingValueOnFormSubmission("phone_number", "12345")
    itSubmitsNewValue("phone_number", "12345")
  })
})

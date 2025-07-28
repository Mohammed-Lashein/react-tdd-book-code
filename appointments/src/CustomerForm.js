import { useState } from "react"

export function CustomerForm({ first_name, onSubmit, last_name }) {
  // const customer = {first_name}
  const [customer, setCustomer] = useState({ first_name, last_name })
  function handleTextInputChange(e, inputName) {
    // Note that the e obj will be passed to this function
    // since we are expecting args to be passed to it we no longer have access to e object
    setCustomer({
      ...customer,
      [inputName]: e.target.value,
    })
  }
  // function handleFirstNameChange(e) {
  //   setCustomer({
  //     ...customer,
  //     first_name: e.target.value
  //   })
  // }
  return (
    <form
      id='customer'
      onSubmit={() => {
        console.log("From CustomerForm component first_name value : ")
        console.log(customer.first_name)

        onSubmit(customer)
      }}
    >
      <label htmlFor='first_name'>First Name :</label>
      <input
        type='text'
        name='first_name'
        value={customer.first_name}
        id='first_name'
        onChange={(e) => handleTextInputChange(e, e.target.id)}
      />

      <label htmlFor='last_name'>Last Name :</label>
      <input
        type='text'
        name='last_name'
        readOnly
        value={customer.last_name}
        id='last_name'
        onChange={(e) => handleTextInputChange(e, e.target.id)}
      />
    </form>
  )
}

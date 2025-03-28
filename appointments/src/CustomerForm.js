import { useState } from 'react'

export function CustomerForm({ first_name, onSubmit }) {
  // const customer = {first_name}
const [customer, setCustomer] = useState({first_name})
function handleFirstNameChange(e) {
  setCustomer({
    ...customer,
    first_name: e.target.value
  })
}
	return (
		<form id='customer' onSubmit={() => {
      console.log("From CustomerForm component first_name value : ");
      console.log(customer.first_name);
      
      onSubmit(customer)
    }}>
      <label htmlFor="first_name">
      First Name : 
      </label>
			<input
				type='text'
				name='first_name'
				value={customer.first_name}
        id='first_name'
        onChange={(e) => handleFirstNameChange(e)}
			/>
		</form>
	)
}

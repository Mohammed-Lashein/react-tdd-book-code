import { useState } from 'react'

export function CustomerForm({ firstName, onSubmit }) {
  // const customer = {firstName}
const [customer, setCustomer] = useState({firstName})
function handleFirstNameChange(e) {
  console.log('this is e ');
  console.log(e);
  setCustomer({
    ...customer,
    firstName: e.target.value
  })
}
	return (
		<form id='customer' onSubmit={() => {
      console.log("From CustomerForm component firstname value : ");
      console.log(customer.firstName);
      
      onSubmit(customer)
    }}>
      <label htmlFor="first_name">
      First name: 
      </label>
			<input
				type='text'
				name='first_name'
				value={customer.firstName}
        id='first_name'
        onChange={(e) => handleFirstNameChange(e)}
			/>
		</form>
	)
}

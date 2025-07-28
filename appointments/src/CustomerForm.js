import { useState } from "react"

export function CustomerForm({
	original = {
		first_name: "",
		last_name: "",
		phone_number: "",
	},
	onSubmit,
}) {
	// const customer = {first_name}
	const [customer, setCustomer] = useState(original)
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
			onSubmit={() => onSubmit(customer)}
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

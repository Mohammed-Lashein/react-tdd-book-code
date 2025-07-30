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
      className="flex flex-col pt-2 mx-auto"
    >
      <div className="flex items-center justify-center gap-1 p-1 form-group">
      <label htmlFor='first_name' className='w-36'>First Name:</label>
      <input
        type='text'
        name='first_name'
        value={customer.first_name}
        className='border rounded border-slate-500'
        id='first_name'
        onChange={(e) => handleTextInputChange(e, e.target.id)}
      />
      </div>

      <div className="flex items-center justify-center gap-1 p-1 form-group">
        <label htmlFor='last_name' className='w-36'>Last Name:</label>
        <input
          type='text'
          name='last_name'
          value={customer.last_name}
          className='border rounded border-slate-500'
          id='last_name'
          onChange={(e) => handleTextInputChange(e, e.target.id)}
        />
      </div>

      <div className="flex items-center justify-center gap-1 p-1 form-group">
        <label htmlFor='phone_number' className='w-36'>Phone Number:</label>
        <input
          type='text'
          name='phone_number'
          value={customer.phone_number}
          className='border rounded border-slate-500'
          id='phone_number'
          onChange={(e) => handleTextInputChange(e, e.target.id)}
        />
      </div>
          
      <div className="flex items-end justify-center gap-1 p-1 form-group">
        <span className='inline-block w-36'></span>
      <input type="submit" value="Add" className='text-white bg-blue-400 rounded cursor-pointer w-44'/>
    </div>
    </form>
  )
}

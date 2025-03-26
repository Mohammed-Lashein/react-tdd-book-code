export function CustomerForm({ firstName }) {
	return (
		<form id='customer'>
			<input
				type='text'
				name='first_name'
				value={firstName}
        readOnly
			/>
		</form>
	)
}

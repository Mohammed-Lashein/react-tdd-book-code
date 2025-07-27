export const appointmentTimeOfDay = (startsAt) => {
	const [h, m] = new Date(startsAt).toTimeString().split(':')
	/* 
	some clarifying comments : 

	new Date(startsAt).toTimeString()
	// '09:18:09 GMT+0200 (Eastern European Standard Time)'

	new Date(startsAt).toTimeString().split(':')
	// [
    "09",
    "18",
    "09 GMT+0200 (Eastern European Standard Time)"
		]
	*/
	return `${h}:${m}`
}
// import React from 'react'
/* No need to manually import React here as babel will do it
thanks to the new config we added ("runtime": "automatic")  */
export const Appointment = ({ customer }) => {
	return <div>{customer.firstName}</div>
}
export const AppointmentsDayView = ({ appointments }) => {
	const appointmentTimeOfDay = (startsAt) => {
		const [h, m] = new Date(startsAt)
    .toTimeString()
    .split(':')

    return `${h}:${m}`
	}

	return (
		<div id='appointmentsDayView'>
			{/* <ol>
				{appointments.map(({ startsAt }) => {
					return <li key={startsAt}>{appointmentTimeOfDay(startsAt)}</li>
				})}
			</ol> */}

      {appointments.length > 0 ? (
        <Appointment {...appointments[0]}/>
      ) : (
      <p>
      There are no appointments scheduled for today
      </p>
      )}
		</div>
	)
}

// import React from 'react'
import { Fragment, useState } from 'react'
import { exercisesSampleAppointments } from '../../exerciseSampleData'

const appointmentTimeOfDay = (startsAt) => {
	const [h, m] = new Date(startsAt).toTimeString().split(':')

	return `${h}:${m}`
}

function AvailableAppointmentTimes({ appointments, selectedAppointment, setSelectedAppointment }) {
	return (
		<ul className='appointments'>
			{/* I changed from ol to ul because in the exercises we will need a ul  */}
			{appointments.map(({ startsAt }, i) => {
				return (
					<li key={startsAt}>
						<button
							type='button'
							onClick={() => setSelectedAppointment(i)}
							className={`appointment-time ${i === selectedAppointment ? 'active' : ''}`}
						>
							{appointmentTimeOfDay(startsAt)}
						</button>
					</li>
				)
			})}
		</ul>
	)
}

/* No need to manually import React here (in order not to get an error since we have a function that returns jsx, which isn't valid js )as babel will do it
thanks to the new config we added ("runtime": "automatic")  */

export const Appointment = ({ appointment }) => {
	// This const is so important because calling
	// appointmentTimeOfDay directly in the returned tags will
	// cause infinite re-renders
	const { customer, startsAt} = appointment

	const appointmentHour = appointmentTimeOfDay(startsAt)
	return (
		<div className='appointment'>
			<h2>Today's appointment at {appointmentHour}</h2>
			<table style={{ paddingLeft: '3rem', borderSpacing: '1rem' }}>
				<tbody>
					{Object.keys(appointment).map((key, i) => {
						if (key === 'customer') {
							return (
								<Fragment key={i}>
									<tr>
										<td style={{ textDecoration: 'underline' }}>Customer</td>
										<td>{customer.firstName + ' ' + customer.lastName}</td>
									</tr>
									<tr>
										<td
											style={{
												textDecoration: 'underline',
                        /* It seems that td text wrap by default,
                       and we don't want that here */
												textWrap: 'nowrap',
											}}
										>
											Phone Number
										</td>
										<td>{customer.phoneNumber}</td>
									</tr>
								</Fragment>
							)
						}
						if (key === 'startsAt') return
						return (
							<tr key={i}>
								<td style={{ textDecoration: 'underline', textTransform: 'capitalize' }}>{key}</td>
								<td>{appointment[key]}</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}
export const AppointmentsDayView = ({ appointments }) => {
	const [selectedAppointment, setSelectedAppointment] = useState(0)

	return (
		<div id='appointmentsDayView'>
			{appointments.length > 0 ? (
				<>
					<AvailableAppointmentTimes
						appointments={exercisesSampleAppointments}
						selectedAppointment={selectedAppointment}
						setSelectedAppointment={setSelectedAppointment}
					/>
					<Appointment appointment={appointments[selectedAppointment]} />
				</>
			) : (
				<p>There are no appointments scheduled for today</p>
			)}
		</div>
	)
}

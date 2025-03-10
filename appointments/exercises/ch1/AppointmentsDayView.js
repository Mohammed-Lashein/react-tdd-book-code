// import React from 'react'

import { useState } from 'react'
import { exercisesSampleAppointments } from './exerciseSampleData'
exercisesSampleAppointments

console.log(exercisesSampleAppointments[0]);


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

/* No need to manually import React here as babel will do it
thanks to the new config we added ("runtime": "automatic")  */

export const Appointment = ({ customer, startsAt }) => {
  const appointmentHour = appointmentTimeOfDay(startsAt)
  return (
    <div className='appointment'>
      <h2>Today's appointment at {appointmentHour}</h2>
      <div>{customer.firstName}</div>
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
          <Appointment {...exercisesSampleAppointments[selectedAppointment]} />
        </>
      ) : (
        <p>There are no appointments scheduled for today</p>
      )}
    </div>
  )
}

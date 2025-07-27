// import React from 'react'
import { useState } from 'react'
import { ExerciseAppointment } from './ExerciseAppointment'
import { appointmentTimeOfDay } from '../utils'


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

export const ExerciseAppointmentsDayView = ({ appointments }) => {
  const [selectedAppointment, setSelectedAppointment] = useState(0)

  return (
    <div id='appointmentsDayView'>
      {appointments.length > 0 ? (
        <>
          <AvailableAppointmentTimes
            appointments={appointments}
            selectedAppointment={selectedAppointment}
            setSelectedAppointment={setSelectedAppointment}
          />
          <ExerciseAppointment appointment={appointments[selectedAppointment]} />
        </>
      ) : (
        <p>There are no appointments scheduled for today</p>
      )}
    </div>
  )
}

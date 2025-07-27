import { appointmentTimeOfDay } from '../utils'

export function AvailableAppointmentTimes({ appointments, selectedAppointment, setSelectedAppointment }) {
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

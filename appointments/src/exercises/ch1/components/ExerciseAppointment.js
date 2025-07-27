import { Fragment } from 'react'
import { appointmentTimeOfDay } from '../utils'

export const ExerciseAppointment = ({ appointment }) => {
  const { customer, startsAt} = appointment
  
  // This const is so important because calling
  // appointmentTimeOfDay directly in the returned tags will
  // cause infinite re-renders
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
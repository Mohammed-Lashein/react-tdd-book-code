import { useState } from 'react'

function dailyTimeSlots(salonOpensAt, salonClosesAt) {
  // Instead of cluttering the function body with explanations, I will add them in the notes dir
  const totalSlots = (salonClosesAt - salonOpensAt) * 2
  const startTime = new Date().setHours(salonOpensAt, 0, 0, 0)
  const increment = 30 * 60 * 1000

  return Array.from({length: totalSlots}, (_, i) => {
      let timestamp = startTime + i * increment

      return new Intl.DateTimeFormat("en-us", {
        timeStyle: 'short'
      }).format(timestamp)
   })
}

function TimeSlotsTable({
  salonOpensAt = 9, 
  salonClosesAt = 13
}) {
  const timeslots = dailyTimeSlots(salonOpensAt, salonClosesAt)
  return (
    <table id="timeslots">
      <tbody>

      {timeslots.map((timeslot) => (
        <tr key={timeslot}>
          <th>{timeslot}</th>
        </tr>
      ))}
      </tbody>
    </table>
  )
}

export function AppointmentForm({
  services = [],
  selectedService = "",
  onSubmit,
  salonOpensAt,
  salonClosesAt
}) {  
  const [appointmentSelectedService, setAppointmentSelectedService] = useState(selectedService);
  return (
    <form 
      id="appointment" 
      onSubmit={() => onSubmit(appointmentSelectedService)}
    >
      <label htmlFor="service"></label>
      <select 
        name="service" 
        id="service" 
        value={selectedService}        
        onChange={(e) => setAppointmentSelectedService(e.target.value)}
      >
        <option value=""></option>
        {services.map((service) => {
          return <option value={service} key={service}>{service}</option>
        })}
      </select>
      <input type="submit" value="Submit" />
      <TimeSlotsTable salonOpensAt={salonOpensAt} salonClosesAt={salonClosesAt}/>
    </form>
  )
}
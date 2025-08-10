import { useState } from 'react'

function dailyTimeSlots(salonOpensAt, salonClosesAt) {
  // Instead of cluttering the function body with explanations, I will add them in the notes dir
  const totalSlots = (salonClosesAt - salonOpensAt) * 2
  const startTime = new Date().setHours(salonOpensAt, 0, 0, 0)
  const increment = 30 * 60 * 1000

  return Array.from({length: totalSlots}, (_, i) => {
      let timestamp = startTime + i * increment

      return new Date(timestamp).toTimeString().substring(0,5)
   })
}
function getWeekdaysStartingFrom(todayTimestamp) {
  const incrementADay = 24 * 60 * 60 * 1000 // total ms in a day
  return Array.from({length: 7}, (_, i) => {
    return new Date(todayTimestamp + i * incrementADay)
          .toDateString() // Sun Aug 10 2025
          .split(" ")[0]
  })
}

function TimeSlotsTable({
  salonOpensAt = 9, 
  salonClosesAt = 13,
  todayTimestamp = 0
}) {
  const timeslots = dailyTimeSlots(salonOpensAt, salonClosesAt)
  const weekDays = getWeekdaysStartingFrom(todayTimestamp)
  return (
    <table id="timeslots">
      <thead>
        <tr>
          <th></th>
          {weekDays.map((day) => <th key={day}>{day}</th>)}
        </tr>
      </thead>
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
  salonClosesAt,
  todayTimestamp
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
      <TimeSlotsTable 
        salonOpensAt={salonOpensAt} 
        salonClosesAt={salonClosesAt} 
        todayTimestamp={todayTimestamp}
      />
    </form>
  )
}
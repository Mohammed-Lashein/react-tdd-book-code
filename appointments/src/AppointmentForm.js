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
  const salonWorkingDays = 7
  return Array.from({length: salonWorkingDays}, (_, i) => {
    return new Date(todayTimestamp + i * incrementADay)
          .toDateString() // Sun Aug 10 2025
          .split(" ")[0]
  })
}

export function TimeSlotsTable({
  salonOpensAt = 9, 
  salonClosesAt = 13,
  todayTimestamp = new Date()
}) {
  const timeslots = dailyTimeSlots(salonOpensAt, salonClosesAt)
  const weekDays = getWeekdaysStartingFrom(todayTimestamp)
  return (
    <table id="timeslots" className='mx-auto border border-black border-solid'>
      <thead className='border border-black border-solid '>
        <tr>
          <th className='p-3'></th>
          {weekDays.map((day) => <th key={day} className='p-3'>{day}</th>)}
        </tr>
      </thead>
      <tbody>
      {timeslots.map((timeslot,i) => (
        <tr key={timeslot} className='p-3'>
          {/* The logic in th className ensures that the timeslot th in the last row has a bottom border */}
          <th 
            className={`p-3 border border-black border-solid ${i !== timeslots.length - 1 ? 'border-b-transparent' : ''}`}
          >
            {timeslot}
          </th>
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
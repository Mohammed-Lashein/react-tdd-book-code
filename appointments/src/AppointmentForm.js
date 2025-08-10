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

function TimeSlotsTable() {
  return (
    <table id="timeslots"></table>
  )
}

export function AppointmentForm({
  services = [],
  selectedService = "",
  onSubmit
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
      <TimeSlotsTable />
    </form>
  )
}
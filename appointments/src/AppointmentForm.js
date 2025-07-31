import { useState } from 'react'

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
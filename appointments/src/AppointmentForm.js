export function AppointmentForm({
  services = [],
  selectedService = ""
}) {  
  return (
    <form id="appointment">
      <select name="service" id="" value={selectedService}>
        <option value=""></option>
        {services.map((service) => {
          return <option value={service} key={service}>{service}</option>
        })}
      </select>
      <input type="text" name='pudding'/>
    </form>
  )
}
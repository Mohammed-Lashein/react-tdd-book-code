export function AppointmentForm({services = []}) {  
  return (
    <form id="appointment">
      <select name="service" id="">
        <option value=""></option>
        {services.map((service) => {
          return <option value={service} key={service}>{service}</option>
        })}
      </select>
      <input type="text" name='pudding'/>
    </form>
  )
}
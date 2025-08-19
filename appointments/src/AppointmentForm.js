import { useCallback, useState } from 'react'

function dailyTimeSlots(salonOpensAt, salonClosesAt) {
	// Instead of cluttering the function body with explanations, I will add them in the notes dir
	const totalSlots = (salonClosesAt - salonOpensAt) * 2
	/* 
    MINDFUL THINKING: 
    Does this function need the passed timestamp to the component instead of calling new Date() which may
    show offset results if we are not starting from today?

    => After looking into the writer's code, he used new Date() as me. Try passing the timestamp to this fn
    and see if the behavior will differ

    Since we start counting the available TimeSlots from today, there is no need to pass the timestamp to
    the function as it can be calculated internally as we are doing.
  */
	const startTime = new Date().setHours(salonOpensAt, 0, 0, 0)
	const increment = 30 * 60 * 1000

	return Array.from({ length: totalSlots }, (_, i) => {
		let timestamp = startTime + i * increment
		return new Date(timestamp).toTimeString().substring(0, 5)
	})
}
function getWeekdaysStartingFrom(todayTimestamp) {
	const incrementADay = 24 * 60 * 60 * 1000 // total ms in a day
	const salonWorkingDays = 7
	return Array.from({ length: salonWorkingDays }, (_, i) => {
		return new Date(todayTimestamp + i * incrementADay)
			.toDateString() // Sun Aug 10 2025
			.split(' ')[0]
	})
}

/* 
  Since the writer made the above utility getWeekdaysStartingFrom return timestamps and not the day names,
he was able to get the timestamps numbers

  So how will we get the day names?
=> From the toShortDate() utility in the repo
*/
function getWeekdaysTimeStampsStartingFrom(todayTimestamp) {
	const incrementADay = 24 * 60 * 60 * 1000 // total ms in a day
	const salonWorkingDays = 7
	const todayMidnight = new Date(todayTimestamp).setHours(0, 0, 0, 0)
	return Array.from({ length: salonWorkingDays }, (_, i) => {
		return new Date(todayMidnight + i * incrementADay).getTime()
	})
}

function parseHoursAndMinutesFromTimeSlot(timeslot) {
	let [hours, minutes] = timeslot.split(':')
	hours = Number(hours)
	minutes = Number(minutes)
	return { hours, minutes }
}

function getTimeStampFromHoursAndMinutes(baseTimestamp, hours, minutes) {
	return new Date(baseTimestamp).setHours(hours, minutes)
}

function getTimeStampToCompareWithAvailableSlotTimestamp(timeslot, baseTimestamp) {
	const { hours, minutes } = parseHoursAndMinutesFromTimeSlot(timeslot)
	const timestamp = getTimeStampFromHoursAndMinutes(baseTimestamp, hours, minutes)
	return timestamp
}

function RadioButtonIfAvailable({
	availableTimeSlots,
	weekDayTimestampWithAppointmentTimeAdded,
	checkedTimeslotTimestamp,
	handleStartsAtChange,
}) {
	const timestampsMatch = availableTimeSlots.some(
		(availableTimeSlot, i) => availableTimeSlot.startsAt === weekDayTimestampWithAppointmentTimeAdded
	)
	if (timestampsMatch) {
		const isChecked = weekDayTimestampWithAppointmentTimeAdded === checkedTimeslotTimestamp
		return (
			<input
				type='radio'
				name='startsAt'
				value={weekDayTimestampWithAppointmentTimeAdded}
				checked={isChecked}
				onChange={(e) => handleStartsAtChange(e)}
			/>
		)
	}
	return null
}

export function TimeSlotsTable({
	salonOpensAt = 9,
	salonClosesAt = 15,
	todayTimestamp = Date.now(),
	availableTimeSlots = [],
	checkedTimeslotTimestamp,
  handleStartsAtChange,
}) {
	const timeslots = dailyTimeSlots(salonOpensAt, salonClosesAt)
	const weekDays = getWeekdaysStartingFrom(todayTimestamp)
	const weekdaysTimestamps = getWeekdaysTimeStampsStartingFrom(todayTimestamp)

	return (
		<table
			id='timeslots'
			className='mx-auto border border-black border-solid table-fixed w-[530px]'
		>
			<thead className='border border-black border-solid '>
				<tr>
					<th className='p-3'></th>
					{weekDays.map((day) => (
						<th
							key={day}
							className='p-3'
						>
							{day}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{timeslots.map((timeslot, i) => (
					<tr
						key={timeslot}
						className='p-3'
					>
						<th
							className={`p-3 border border-black border-solid ${i !== timeslots.length - 1 ? 'border-b-transparent' : ''}`}
						>
							{timeslot}
						</th>
						{weekDays.map((weekDay, i) => {
							const weekDayTimestampWithAppointmentTimeAdded = getTimeStampToCompareWithAvailableSlotTimestamp(
								timeslot,
								weekdaysTimestamps[i]
							)

							return (
								// or key={weekDay}?
								// I am not sure which one to choose
								<td
									className='w-10 p-4 text-center'
									key={i}
								>
									<RadioButtonIfAvailable
										availableTimeSlots={availableTimeSlots}
										weekDayTimestampWithAppointmentTimeAdded={weekDayTimestampWithAppointmentTimeAdded}
										checkedTimeslotTimestamp={checkedTimeslotTimestamp}
                    handleStartsAtChange={handleStartsAtChange}
									/>
								</td>
							)
						})}
					</tr>
				))}
			</tbody>
		</table>
	)
}

export function AppointmentForm({
	services = [],
	onSubmit,
	salonOpensAt,
	salonClosesAt,
	todayTimestamp,
	availableTimeSlots,
	appointmentData = {
    service: ''
  },
}) {
	const [appointment, setAppointment] = useState(appointmentData)
  function handleSelectboxChange(e) {
    setAppointment((appointment) => ({...appointment, [e.target.name]: e.target.value}))
  }
  const handleStartsAtChange = useCallback(({target: {value}}) => {
    setAppointment(() => ({
      ...appointment,
      startsAt: parseInt(value)
    }))
  })
  
	return (
		<form
			id='appointment'
			onSubmit={() => onSubmit(appointment)}
		>
			<label htmlFor='service'></label>
			<select
				name='service'
				id='service'
				value={appointment.service}
				onChange={(e) => handleSelectboxChange(e)}
			>
				<option value=''></option>
				{services.map((service) => {
					return (
						<option
							value={service}
							key={service}
						>
							{service}
						</option>
					)
				})}
			</select>
			<input
				type='submit'
				value='Submit'
			/>
			<TimeSlotsTable
				salonOpensAt={salonOpensAt}
				salonClosesAt={salonClosesAt}
				todayTimestamp={todayTimestamp}
				availableTimeSlots={availableTimeSlots}
				checkedTimeslotTimestamp={appointment.startsAt}
        handleStartsAtChange={handleStartsAtChange}
			/>
		</form>
	)
}

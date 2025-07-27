import { render, screen } from '@testing-library/react';
import { ExerciseAppointmentsDayView } from '../components/ExerciseAppointmentsDayView';
import { exercisesSampleAppointments } from '../../../exerciseSampleData';
import { userEvent } from '@testing-library/user-event';

describe("ExerciseAppointmentsDayView", () => {
  it("displays a message to the user if there are no appointments", () => {
    render(<ExerciseAppointmentsDayView appointments={[]}/>)

    expect(screen.getByText(/There are no appointments scheduled for today/)).toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
  it("shows the 1st available appointment by default", () => {
    render(<ExerciseAppointmentsDayView appointments={exercisesSampleAppointments}/>)

    expect(screen.getByRole('button', {name: '09:00'})).toBeInTheDocument()
    expect(screen.getByText(/Today's appointment at 09:00/i)).toBeInTheDocument()
  })
  test("The user should be able to select an appointment", async () => {
    render(<ExerciseAppointmentsDayView appointments={exercisesSampleAppointments}/>)

    await userEvent.click(screen.getByRole('button', {name: '13:00'}))

    expect(screen.getByText(/Today's appointment at 13:00/i)).toBeInTheDocument()
  })
})

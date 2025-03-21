import React from 'react';
import { createRoot } from 'react-dom/client';
import { AppointmentsDayView } from './exercises/ch1/ExerciseAppointmentsDayView.js';
import { sampleAppointments } from './sampleData';
import { exercisesSampleAppointments } from './exerciseSampleData';


// const domNode = document.createElement('div')
// domNode.id = 'app'
const root = createRoot(document.getElementById('root'))
root.render(
  <AppointmentsDayView appointments={exercisesSampleAppointments}/>
)



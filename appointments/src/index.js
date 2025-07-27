import React from 'react';
import { createRoot } from 'react-dom/client';
import { ExerciseAppointmentsDayView } from './exercises/ch1/components/ExerciseAppointmentsDayView.js';
import { sampleAppointments } from './sampleData';
import { exercisesSampleAppointments } from './exerciseSampleData';


// const domNode = document.createElement('div')
// domNode.id = 'app'
const root = createRoot(document.getElementById('root'))
root.render(
  <ExerciseAppointmentsDayView appointments={exercisesSampleAppointments}/>
)



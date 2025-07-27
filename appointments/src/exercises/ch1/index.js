// This file is important to generate the build specific for this
// chapter

import React from 'react';
import { createRoot } from 'react-dom/client';
import { ExerciseAppointmentsDayView } from './components/ExerciseAppointmentsDayView';
import { exercisesSampleAppointments } from './exerciseSampleData';


// const domNode = document.createElement('div')
// domNode.id = 'app'
const root = createRoot(document.getElementById('root'))
root.render(
  <ExerciseAppointmentsDayView appointments={exercisesSampleAppointments}/>
)



// This file is important to generate the build specific for this
// chapter

import React from 'react';
import { createRoot } from 'react-dom/client';
import { AppointmentsDayView } from './exercises/ch1/ExerciseAppointmentsDayView.js';
import { exercisesSampleAppointments } from './exerciseSampleData';


// const domNode = document.createElement('div')
// domNode.id = 'app'
const root = createRoot(document.getElementById('root'))
root.render(
  <AppointmentsDayView appointments={exercisesSampleAppointments}/>
)



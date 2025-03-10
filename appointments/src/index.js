import React from 'react';
import { createRoot } from 'react-dom/client';
import { AppointmentsDayView } from './AppointmentsDayView';
import { sampleAppointments } from './sampleData';

// const domNode = document.createElement('div')
// domNode.id = 'app'
const root = createRoot(document.getElementById('root'))
root.render(
  <AppointmentsDayView appointments={sampleAppointments}/>
)



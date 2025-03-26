import { StrictMode, act } from 'react';
import { createRoot } from 'react-dom/client';

export const initializeReactContainer = () => {
  const container = document.createElement('div')
  document.body.replaceChildren(container)
  return container
};

export const render = (component) => {
  const root = createRoot(initializeReactContainer())

  root.render(
    <StrictMode>
      {component}
    </StrictMode>
  )
};
export const click = async (el) => {
  await act(async () => {
    el.click()
  })
};
export const element = (selector) => {
  return document.querySelector(selector)
};
export const elements = (selector) => {
  return document.querySelectorAll(selector)
};
export const typesOf = (elements) => {
  return elements.map((el) => el.type)
};
export const textOf = (elements) => {
  return elements.map((el) => el.textContent)
};
export const appointmentTable = () => {
  return element('.appointment > table')
}
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

export const createContainer = () => {
  const container = document.createElement('div')
  return {
    render: (component) => {
      const root = createRoot(container)
      root.render(
        <StrictMode>
          {component}
        </StrictMode>
      )
    },
    container, 
  }
}
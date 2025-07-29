import { act, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

export const createContainer = () => {
  const container = document.createElement('div')
  const root = createRoot(container)
  return {
    render: async (component) => {
      await act(async () => {
        root.render(
          <StrictMode>
            {component}
          </StrictMode>
        )
      })
    },
    container, 
  }
}
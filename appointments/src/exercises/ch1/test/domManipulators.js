import { act, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

export const createContainer = () => {
  const container = document.createElement('div')
  return {
    render: async (component) => {
      const root = createRoot(container)
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
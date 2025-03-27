import {render, screen} from "@testing-library/react"
import App from './App'
it('is shown on the screen', () => {
  render(<App/>)
  const el = screen.getByText(/lama/i)

  expect(el).toBeInTheDocument()
})
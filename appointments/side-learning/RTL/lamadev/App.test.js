import {render, screen} from "@testing-library/react"
import App from './App'
describe("App", () => {
  it('is shown on the screen', () => {
    render(<App/>)
    const el = screen.getByText(/lama/i)
  
    expect(el).toBeInTheDocument()
  })
  it("renders a ul", () => {
    render(<App />)
    const el = screen.getByRole('list');
    expect(el).toBeInTheDocument()
  })
  it("renders 3 list items within the ul", () => {
    render(<App />)
    const listItems = screen.getAllByRole('listitem')
    expect(listItems).toHaveLength(3)
  })
  it('renders apple as the first li item', () => {
    render(<App />)
    const listItems = screen.getAllByRole('listitem')
    expect(listItems[0].textContent).toBe('apple')
  })
  it("renders the h1", () => {
    render(<App />)
    const el = screen.getByTestId('banner')
    expect(el).toBeInTheDocument()
  })
})
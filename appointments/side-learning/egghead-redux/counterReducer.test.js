import { counter } from './counterReducer'

it("increments the count by 1 on dispatch", () => {
  expect(counter(0, {type: 'INCREMENT'})).toBe(1)
})
it("increments the count by 1 on another dispatch", () => {
  expect(counter(1, {type: 'INCREMENT'})).toBe(2)
})
it("decrements the count by 1 on another dispatch", () => {
  expect(counter(1, {type: 'DECREMENT'})).toBe(0)
})
it("decrements the count by 1 on another dispatch", () => {
  expect(counter(1, {type: 'DECREMENT'})).toBe(0)
})
it("returns the initial state if the current state is undefined", () => {
  expect(counter(undefined, {})).toBe(0)
})


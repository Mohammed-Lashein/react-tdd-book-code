import { counter, todos } from './reducers'

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

it("adds a todo ", function() {
  const stateBefore = []
  const action = {
    type: "ADD_TODO",
    id: 0,
    text: "Learn Redux",
    completed: false
  }
  const stateAfter = [
    {
      id: 0,
      text: "Learn Redux",
      completed: false
    }
  ]

  // from jest docs 
  // toBe uses Object.is to test exact equality. If you want to check the value of an object, use toEqual:
  expect(todos(stateBefore, action)).toEqual(stateAfter)
})

/* 
  Is it necessary to reset the state of the store after each test ?
  => NO because we are not storing the state in the reducer function,
  we are just processing the data through it . 
*/

/* 

  Notes on your code : 
  [1] You should have made todo as stateBefore with 2 tasks 
  [2] The test gave you a false +ve bec todos will be stored in an array
  not an obj
  [3] In the dispatch, you should just provide the id of the todo to 
  toggle, not how the toggle should happen (these are the 
  responsibilites of the reducer !)

*/

it("toggles a specific todo", () => {
  // wrong approach
  // const todo = {
  //   id: 0,
  //   text: "Egghead course",
  //   completed: false
  // }
  // const toggledTodo = {
  //   ...todo,
  //   completed: true
  // }
  // const action = {
  //   type: "TOGGLE_TODO",
  //   ...todo
  // }

    // expect(todos(todo, action)).toEqual(toggledTodo)

  // correct approach
  const stateBefore = [
    {
      id: 0,
      text: "Learn tdd",
      completed: false
    },
    {
      id: 1,
      text: 'Learn redux',
      completed: false
    }
  ]
  const action = {
    type: "TOGGLE_TODO",
    id: 1
  }
  const stateAfter = [
    {
      id: 0,
      text: "Learn tdd",
      completed: false
    },
    {
      id: 1,
      text: 'Learn redux',
      completed: true
    }
  ]

  expect(todos(stateBefore, action)).toEqual(stateAfter)
})


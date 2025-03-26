import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createStore } from 'redux'
import { Counter } from './Counter'
import { counter, todoApp, todos, manualTodoApp } from './reducers'
import TasksApp from './TasksApp'

export const store = createStore(todoApp)
// It works !
// const store = createStore(manualTodoApp)

let root
const render = () => {
  /*
  It is important not to re-create the root on each invocation for
  render method, because you will get a console warning saying that you
  should reuse the previously created root . 
  
  Although it is possible in react to have multiple roots in your app,
  but I just encountered that warning so I wanted to talk about it 
  */
  if(!root) {
    root = createRoot(document.getElementById('root'))
  }

	root.render(
		<StrictMode>
			{/* This component is no longer relevant since we are working now
			with todos, and passing an obj trying to display its value in 
			jsx will result in the error -- Uncaught Error: Objects are not valid as a React child */}
			{/* <Counter
				value={store.getState()}
				onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
				onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
			/> */}
			<TasksApp {...store.getState()}/>
		</StrictMode>
	)
}
store.subscribe(render)
render()

console.log('this is initial state');
console.log(store.getState());
store.dispatch({
	type: "ADD_TODO",
	id: 'pudding',
	text: "added manually",
})
console.log(store.getState());
store.dispatch({
	type: "SET_VISIBILITY_FILTER",
	filter: 'SHOW_ALL '
})
console.log(store.getState());




// document.addEventListener('click', () => store.dispatch({ type: 'INCREMENT' }))


// manually implement createStore
const MyManualcreateStore = (reducer) => {
	let state // the store by default contains the state obj
	/*it is important to keep track of the change listeners because a  subscribe fn can be called many times */
	let listeners = []
	const getState = () => state

	const dispatch = (action) => {
		// get the new state
		state = reducer(state, action)
		// update every listener with the new state
		listeners.forEach((listener) => listener())
	}

	const subscribe = (listener) => {
		listeners.push(listener)

		// to unsubscribe from the store if needed
		return () => {
			listeners.filter((l) => l !== listener)
		}
	}
	// dispatch a dummy action to get the initial store state
	dispatch({})

	return { dispatch, getState, subscribe }
}

const manualStore = MyManualcreateStore(counter)
const manualRender = () => {
	document.body.textContent = manualStore.getState()
}
manualStore.subscribe(manualRender)
// manualRender()

// document.addEventListener('click', () => {

//   manualStore.dispatch({ type: 'INCREMENT' })

// })

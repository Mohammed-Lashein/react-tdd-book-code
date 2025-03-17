import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createStore } from 'redux'
import { Counter } from './Counter'
export function counter(state = 0, action) {
	if (typeof state === 'undefined') {
		return 0
	}

	if (action.type === 'INCREMENT') {
		return state + 1
	}
	if (action.type === 'DECREMENT') {
		return state - 1
	}
	return state
}

const store = createStore(counter)

let root
const render = () => {
  if(!root) {
    root = createRoot(document.getElementById('root'))
  }
	root.render(
		<StrictMode>
			<Counter
				value={store.getState()}
				onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
				onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
			/>
		</StrictMode>
	)
  console.log('rendering !!!');
  
}
store.subscribe(render)
render()
// document.addEventListener('click', () => store.dispatch({ type: 'INCREMENT' }))

// manual store implementation

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

import {combineReducers} from 'redux'
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

const todo = (state,action) => {
	switch(action.type) {
		case "ADD_TODO":
			return {
				id: action.id,
				text: action.text,
				completed: false
			};
			case "TOGGLE_TODO":
			if(state.id !== action.id) {
				return state
			} 
			return {
				...state,
				completed: !state.completed
			}
			default: 
			/* There is no need to do that here but this is a good habit to 
			build on using redux */
			return state
	}
}

export function todos(state = [], action) {
  if(action.type === 'ADD_TODO') {
    return [
				...state,
				todo(undefined, action)
		]
  }
	/* 
		This was my code, but the instructor moved the logic to toggle
		the todo to the end of the condition . 

		Both of them are true, I will try to stick to his approach as I find that it saves me from being forced to look at the logic 
		toggling the todo state unnecessarily 
	*/
	// if(action.type === "TOGGLE_TODO") {
	// 	return state.map((todo) => {
	// 		if(todo.id === action.id) {
	// 			return {
	// 				...todo,
	// 				completed: !todo.completed
	// 			}
	// 		}
	// 		return todo
	// 	})
	// }
	if(action.type === "TOGGLE_TODO") {
		return state.map((t) => todo(t, action))
	}
	return state
}

export const visibilityFilter = (
	state = 'SHOW_ALL',
	action
) => {
	switch(action.type) {
		case 'SET_VISIBILITY_FILTER':
			return action.filter
		default: 
			return state
	}
}
// manually combining reducers
// export function todoApp(state = {}, action) {
// 	return ({
// 		todos: todos(state.todos, action),
// 		visibilityFilter: visibilityFilter(state.visibilityFilter,action)
// 	})
// }

export const todoApp = combineReducers({
	todos, visibilityFilter
})

const manualCombineReducers = (reducers) => {
	// let state = store.getState()
	return (state = {}, action) => {
		let reducersKeys = Object.keys(reducers) 
		let finalReducers = {}
		reducersKeys.forEach((key) => {
			finalReducers[key] = reducers[key](state[key], action)
		})
		return finalReducers
	}
}
export const manualTodoApp = manualCombineReducers({
	todos, visibilityFilter
})
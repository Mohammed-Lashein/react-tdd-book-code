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
			return;
			break
	}
}

export function todos(state, action) {
  if(action.type === 'ADD_TODO') {
    return [
				...state,
				{
					id: action.id,
					text: action.text,
					completed: false
					
				}
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
		return state.map((todo) => {
			if(todo.id !== action.id) {
				return todo
			}

			return {
				...todo,
				completed: !todo.completed
			}
			
		})
	}
	return state
}
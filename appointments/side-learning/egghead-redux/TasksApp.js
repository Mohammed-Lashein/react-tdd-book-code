import React, { Component } from 'react'
import { store } from './storeAndRenderComponent'
let nextTodoId = 0
class TasksApp extends Component {
	state = {}
	render() {
		return (
			<div data-testid='TasksApp'>
        <input 
          type="text" 
          ref={node => this.input = node}
        />
				<button onClick={() => {
          store.dispatch({ 
            type: 'ADD_TODO' ,
            text: this.input.value,
            id: nextTodoId++
            })
            this.input.value = ''
            this.input.focus()
        }}>+</button>
          <ul>
          {this.props.todos.map((todo) => 
            <li key={todo.id} onClick={() => store.dispatch({
              type: 'TOGGLE_TODO',
              id: todo.id
            })} style={{textDecoration: todo.completed ? 'line-through' : ''}}>{todo.text}</li>
          )}
          </ul>
			</div>
		)
	}
}

export default TasksApp

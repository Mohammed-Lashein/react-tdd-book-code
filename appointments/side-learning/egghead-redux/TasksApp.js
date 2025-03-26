import React, { Component } from 'react'
import { store } from './storeAndRenderComponent'
let nextTodoId = 0

const FilterLink = ({ filter, children }) => {
	if (filter === store.getState().visibilityFilter) {
		return <span>{children}</span>
	}

	return (
		<a
			href='#'
			onClick={(e) => {
				e.preventDefault()
				store.dispatch({
					type: 'SET_VISIBILITY_FILTER',
					filter,
				})
			}}
			// The instructor used a different approach
			// style={{fontWeight: store.getState().visibilityFilter === filter && 'bold'}}
		>
			{children}
		</a>
	)
}

const filterVisibleTodos = (todos, filter) => {
	switch (filter) {
		case 'SHOW_ALL':
			return todos
		case 'SHOW_ACTIVE':
			return todos.filter((t) => !t.completed)
		case 'SHOW_COMPLETED':
			return todos.filter((t) => t.completed)
		default:
			return todos
	}
}

const Todo = ({ onClick, completed, text }) => {
	return (
		<li
			onClick={onClick}
			style={{ textDecoration: completed ? 'line-through' : '' }}
		>
			{text}
		</li>
	)
}

const TodoList = ({ todos, onTodoClick }) => {
	return todos.map((todo) => (
		<Todo
			key={todo.id}
			completed={todo.completed}
			text={todo.text}
			onClick={() => onTodoClick(todo.id)}
		/>
	))
}

class TasksApp extends Component {
	state = {}
	render() {
		console.log(this.props)

		const visibleTodos = filterVisibleTodos(
			this.props.todos,
			// How will we pass the visibilityFilter from props then change it
			// using buttons ?
			this.props.visibilityFilter
		)
		return (
			<div data-testid='TasksApp'>
				<input
					type='text'
					ref={(node) => (this.input = node)}
				/>
				<button
					onClick={() => {
						store.dispatch({
							type: 'ADD_TODO',
							text: this.input.value,
							id: nextTodoId++,
						})
						this.input.value = ''
						this.input.focus()
					}}
				>
					+
				</button>
				<ul>{<TodoList todos={visibleTodos} onTodoClick={(id) =>
				store.dispatch({
					type: 'TOGGLE_TODO',
					id,
				})}/>}</ul>
				<p>
					Show: {<FilterLink filter='SHOW_ALL'>All</FilterLink>}
					{<FilterLink filter='SHOW_ACTIVE'>ACTIVE</FilterLink>}
					{<FilterLink filter='SHOW_COMPLETED'>COMPLETED</FilterLink>}
				</p>
			</div>
		)
	}
}

export default TasksApp

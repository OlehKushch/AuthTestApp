import C from './constants.js'
import { v4 } from 'uuid'
import fetch from 'isomorphic-fetch'

export const addTodoPreFetch = (title) => ({
        type: C.ADD_TODO,
        id: v4(),
        title
    })

export const addTodo = (title) => {
    return dispatch => {

        //Perform expected result of the POST API request
        dispatch(addTodoPreFetch(title))

        //API call to POST a new todo with {title}
        return fetch('/api/todos', {
            method: 'POST',
            body: JSON.stringify({ title: title}),
            headers: { "Content-Type": "application/json" }
        })
        .then(
            response => response,
            error => console.log('An error occured.', error)
        ).then(
            response => dispatch(fetchTodos())
        )
    }
}

export const removeTodoPreFetch = (id) => ({
        type: C.REMOVE_TODO,
        id: id
    })

export const removeTodo = (id) => {
    return dispatch => {

        //Perform expected result of the DELETE API request
        dispatch(removeTodoPreFetch(id))

        //API call to delete todo {id}
        return fetch('/api/todos/' + id, {
            method: 'DELETE'
        })
        .then(
            response => dispatch(fetchTodos()),
            error => console.log('An error occured.', error)
        )
    }
}

export const editTodoPreFetch = (id, title) => ({
        type: C.EDIT_TODO,
        id: id,
        title: title
    })

export const editTodo = (id, title) => {
    return dispatch => {

        //Perform expected result of the PUT API request
        dispatch(editTodoPreFetch(id, title))

        //API call to edit todo {id}, with new title: {title}
        return fetch('/api/todos/' + id, {
            method: 'PUT',
            body: JSON.stringify({ title: title, id: id}),
            headers: { "Content-Type": "application/json" }
        })
        .then(
            response => dispatch(fetchTodos()),
            error => console.log('An error occured.', error)
        )
    }
}

//A thunk which will fetch+set the state of the todo list from the backend db
export const fetchTodos = () => {
    return dispatch => {
        return fetch('/api/todos')
        .then(
            response => response.json(),
            error => console.log('An error occured.', error)
        )
        .then(
            json => dispatch(setTodos(json))
        )
    }
}

export const setTodos = (todos) => ({
    type: C.SET_TODOS,
    todos: todos
})

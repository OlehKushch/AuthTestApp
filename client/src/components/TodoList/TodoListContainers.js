import AddTodoForm from './AddTodoForm'
import ShowTodoList from './ShowTodoList'
import { connect } from 'react-redux'
import { addTodo, removeTodo, editTodo } from '../../actions'

export const AddTodoContainer = connect(
    null,
    dispatch => ({
        onAdd(title) {
            dispatch(addTodo(title))
        }
    })
)(AddTodoForm)

export const TodoListContainer = connect(
    state => ({
        todos: state.todos
    }),
    dispatch => ({
        onRemove(id) {
            dispatch(removeTodo(id))
        },
        onEdit(id, title) {
            dispatch(editTodo(id, title))
        }
    })
)(ShowTodoList)

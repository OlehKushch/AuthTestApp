import { PropTypes, Component } from 'react'

class AddTodoForm extends Component {

    render () {
        let title = ''
        const {store} = this.context
        const state = store.getState()
        return (
            <div className="todo-add-form">
                <form onSubmit={ e =>{
                        e.preventDefault()
                        this.props.onAdd(title.value)
                        title.value = ''
                    }}>
                    <input  placeholder="Add todo here..."
                            ref={input=>title=input}></input>
                    <button>Add Todo</button>
                </form>
            </div>
        )
    }
}

AddTodoForm.contextTypes = {
    store: PropTypes.object
}

export default AddTodoForm

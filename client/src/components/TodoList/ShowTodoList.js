import { PropTypes, Component } from 'react'
import ShowTodoItem from './ShowTodoItem'
import EditTodoItem from './EditTodoItem'

class ShowTodoList extends Component {

    constructor(props) {
        super(props)
        this.state = {editing: ""}
        this.setEditingItem=this.setEditingItem.bind(this)
        this.editItem=this.editItem.bind(this)
    }

    //set the id of the item currently being edited
    setEditingItem(id) {
        this.setState({editing: id})
    }

    //dispatch an item edit
    //set the editing item to no id
    editItem(new_title, id) {
        this.props.onEdit(id, new_title)
        this.setEditingItem("")
    }

    render() {
        const { store } = this.context
        const state = store.getState()

        return (
            <div>
                {state.todos.map((todo,i) => {
                    if(todo.id === this.state.editing) {
                        return (
                        <EditTodoItem
                            key={i}
                            title={todo.title}
                            onRemove={()=>this.props.onRemove(todo.id)}
                            onEdit={(new_title)=>this.editItem(new_title, todo.id)}>
                        </EditTodoItem> )
                    } else {
                        return (
                        <ShowTodoItem
                            key={i}
                            title={todo.title}
                            onRemove={()=>this.props.onRemove(todo.id)}
                            onEdit={()=>this.setEditingItem(todo.id)}>
                        </ShowTodoItem> )
                    }
                })}
            </div>
        )//return
    }//render
}

ShowTodoList.contextTypes = {
    store: PropTypes.object
}

export default ShowTodoList

const EditTodoItem = ({onRemove=f=>f, onEdit=f=>f, title}) => {
    let new_title = ''

    return (
        <div className="todo-item edit">
            <input autoFocus placeholder="Edit todo item..."
                    onKeyPress={event => {
                        if (event.key === "Enter") {
                            onEdit(new_title.value)
                        }
                    }}
                    defaultValue={title}
                    ref={input=>new_title=input}></input>
            <div onClick={onRemove} className="todo-rm-btn">X</div>
            <div onClick={()=>onEdit(new_title.value)} className="todo-edit-btn">✓</div>
        </div>
    )//return
}

export default EditTodoItem

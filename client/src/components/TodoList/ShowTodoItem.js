const ShowTodoItem = ({onRemove=f=>f, onEdit=f=>f, title}) =>
    <div className="todo-item">
        <div onClick={onEdit} className="todo-title">{title}</div>
        <div onClick={onRemove} className="todo-rm-btn">X</div>
        <div onClick={onEdit} className="todo-edit-btn start">✎</div>
    </div>

export default ShowTodoItem

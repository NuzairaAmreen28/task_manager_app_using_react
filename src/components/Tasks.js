import Task from "./Task";
import "../index.css"
export default function Tasks ({tasks, onDelete, onEdit}){
    return(
        <>
            {
            tasks.map((task) => (
                <Task key={task.id} task={task} onDelete={onDelete} onEdit={onEdit} />
            ))
            }
        </>
    )
}


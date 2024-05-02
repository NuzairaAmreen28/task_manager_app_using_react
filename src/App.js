import AddTask from './components/AddTask';
import Header from './components/Header';
import Tasks from './components/Tasks';
import { useState, useEffect } from 'react';
import './index.css';
import { v4 as uuidv4 } from 'uuid';
import Swal from "sweetalert2";



function App() {
  const [tasks, setTasks] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);

  //Adding Task
  const addTask = (task)=>{
    const id = uuidv4();
    const newTask = {id, ...task};
    setTasks([...tasks, newTask]);
    Swal.fire({
      icon: 'success',
      title: 'Hurray!',
      text: 'Your Task has been added!'
    });
    localStorage.setItem("taskAdded", JSON.stringify([...tasks, newTask]));
  }

  //Deleting Task
  const deleteTask = (id)=>{
    const deleteTask = tasks.filter((task)=>task.id !== id);
    setTasks(deleteTask);
    Swal.fire({
      icon: 'success',
      title: 'Oops..',
      text: 'Your Task has been deleted successfully!'
    })
    localStorage.setItem("taskAdded",JSON.stringify(deleteTask));
  }

  //Editing Task
  const editTask = (id) => {
    const text = prompt('Task Name');
    const day = prompt('Day and Time');
    const myData = tasks.map(x => {
      if(x.id===id){
        return{
          ...x,
          text: text,
          day: day,
          id: uuidv4()
        }
      }
      return x;
    })
    Swal.fire({
      icon: 'success',
      title: 'Hurray!',
      text: 'Your Task has been edited.'
    })
    localStorage.setItem("taskAdded",JSON.stringify(myData));
    window.location.reload();
  }

  const getTasks = JSON.parse(localStorage.getItem("taskAdded"));
  useEffect(() => {
    if(getTasks==null){
      setTasks([])
    }
    else
      setTasks(getTasks);
  }, [])
  

  return (
    <div>
    <Header showForm={()=>setShowAddTask(!showAddTask)} changeTextAndColor={showAddTask} />
    {
      showAddTask && <AddTask onSave={addTask}/>
    }
    {
      tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onEdit={editTask}/>) : <h3>'No Task Found!'</h3>
    }
    <br /><h4>Number of Tasks:{tasks.length}</h4>
    
    
   
   </div>
  );
}

export default App;

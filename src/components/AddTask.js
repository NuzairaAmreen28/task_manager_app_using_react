import {useState} from 'react';
import Swal from "sweetalert2";

export default function AddTask({onSave}){
    const [text, setText] = useState('');
    const [day,setDay] = useState('');
    const onSubmit = (e) => {
        e.preventDefault();
        if(!text && !day){
            Swal.fire({
                icon :'error',
                title :'Oops..',
                text:'Fill in your task and date or close the form.'
            })
        }
        else if(!text && day){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Your Task is empty!'
            })
        }
        else if(text && !day){
            Swal.fire({
                icon: 'error',
                title: 'Ooops..',
                text: 'Your date is empty!'
            })
        }
        else{
            onSave({text,day});
        }
        setText('');
        setDay('');
    }
    return(
        <form className="add-form" onSubmit={onSubmit}>
            <div className="form-control">
                <label>Task</label>
                <input type="text" placeholder="Add Task" value={text} onChange= {(e)=>setText(e.target.value)} />
            </div>
            <div className="form-control">
                <label>Day & Time</label>
                <input type="text" placeholder="Add Day & Time" value={day} onChange= {(e)=>setDay(e.target.value)} />
            </div>
            <input type="submit" value="Save Task" className="btn btn-block"/>
        </form>
    );
}
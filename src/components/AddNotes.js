import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

export default function AddNotes() {

    const context =  useContext(noteContext);
    
    //destructure 
    const {addNote} = context;

    const [input,setInputs] = useState({title:"",description:"",tag:"default"});

    const handleChange = (event) =>{

        //destruture
        const {name,value} = event.target;

        setInputs({ ...input, [name]: value} )

    }

    const handleClick = (e) => {
        e.preventDefault();

        //Send all form data to funtion addNote() that we set on NoteState.js
        addNote(input);
    }

    return (
        <div>
            <h2 className="text-center">Create Note</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control"  onChange={handleChange}  id="title" name="title" />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" onChange={handleChange}  id="description" name="description" />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" onChange={handleChange}  id="tag" name="tag" />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
            </form>
        </div>
    )
}

import React, { useContext, useEffect,useState } from 'react'
import noteContext from '../context/notes/noteContext'
import AddNotes from "./AddNotes"
import Noteitem from './Noteitem';


export default function Notes() {

    const context = useContext(noteContext);

    //de-structiring variable to we don't use like context.notes OR context.setNotes in notes
    const { notes, fetchNotes } = context;
    
    const [editNote,setEditNote] = useState({title:"",description:"",tag:""});

    useEffect(() => {
        fetchNotes()
    }, [])


    const handleChange = (event)=> {

        setEditNote({...editNote,[event.target.name]:event.target.value})

    }

    const handleClick = (e) =>{

        e.preventDefault();

        console.log("update note",editNote)
    }

    const editModel = (data) => {
           // console.log(data)
           setEditNote(data);
    }

    return (
        <div>
            <div className='container mt-4'>
                <AddNotes />
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label">Title</label>
                                        <input type="text" className="form-control" onChange={handleChange} value={editNote.title} id="title" name="title" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Description</label>
                                        <input type="text" className="form-control" onChange={handleChange} value={editNote.description} id="description" name="description" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="tag" className="form-label">Tag</label>
                                        <input type="text" className="form-control" onChange={handleChange} value={editNote.tag} id="tag" name="tag" />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleClick}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className='row'>
                    <h2 className='mt-4'>All notes..</h2>
                    {notes.map((notes) => {
                        return <Noteitem key={notes._id} editModel={editModel} note={notes} />
                    })}
                </div>
            </div>
        </div>
    )
}

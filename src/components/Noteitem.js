import React,{useContext} from 'react'
import noteContext from "../context/notes/noteContext"

function Noteitem(props) {
    const { note, editModel} = props;

    const context = useContext(noteContext);
    const {deleteNote} = context;

    return (
        <div className="col-sm-4 mt-3">
            <div className="card">
                <div className="card-body">
                    <div className='d-flex'>
                        <h5 className="card-title">{note.title}</h5>
                        <i className="bi bi-trash mx-2" onClick={()=>deleteNote(note._id)}></i>
                        <i className="bi bi-pencil-fill mx-2" onClick={()=>editModel(note)} data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default Noteitem

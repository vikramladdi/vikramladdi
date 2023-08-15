import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
import AddNotes from "./AddNotes"
import Noteitem from './Noteitem';

export default function Notes() {

    const context = useContext(noteContext);

    //de-structiring variable to we don't use like context.notes OR context.setNotes in notes
    const { notes } = context;

    return (
        <div>
            <div className='container mt-4'>
                <AddNotes />
            </div>
            <div className='container'>
                <div className='row'>
                    <h2 className='mt-4'>All notes..</h2>
                    {notes.map((notes) => {
                        return <Noteitem key={notes._id} note={notes} />
                    })}
                </div>
            </div>
        </div>
    )
}

import React, { useState } from 'react'
import noteContext from './noteContext'


export default function NoteState(props) {

  const backendhost = "http://localhost:5000";

  let inotebook = [];

  const [notes, setNotes] = useState(inotebook);

  const fetchNotes = async () => {
    const fetchurl = `${backendhost}/api/notes/fetchallnotes`;

    try {
      const responce = await fetch(fetchurl, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkNzJlZmNjZTk5Njg5YWQyNTQ2NGU3In0sImlhdCI6MTY5MTgyNjMwOH0.DuJclZTi79qLjXaWB7yzXmH7ivmsn8nHUvGeBTmxwTc'
        }
      });

      const json = await responce.json();
      console.log(json.data)

      setNotes(json.data);

    } catch (error) {
      console.log({ error: error })
    }

  }

  //add Note function to Add note
  const addNote = async (inputs) => {
    console.log("Adding a note");
    const fetchurl = `${backendhost}/api/notes/createnote`;

    try {
      const responce = await fetch(fetchurl, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkNzJlZmNjZTk5Njg5YWQyNTQ2NGU3In0sImlhdCI6MTY5MTgyNjMwOH0.DuJclZTi79qLjXaWB7yzXmH7ivmsn8nHUvGeBTmxwTc'
        },
        body: JSON.stringify({
          title:inputs.title,
          description:inputs.description,
          tag:inputs.tag
        })
      });

      const json = await responce.json();
      console.log(json.data)

    } catch (error) {
      console.log({ error: error })
    }


   //setTimeout(()=>{console.log(inputs)},2000)

  }

  //Edit Note
  const editNote = () => {

  }

  //Delete Note
  const deleteNote = async (id) => {
    //console.log("delete id" + ' ' + id);

    const fetchurl = `${backendhost}/api/notes/delete/${id}`;

    try {
      const responce = await fetch(fetchurl, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkNzJlZmNjZTk5Njg5YWQyNTQ2NGU3In0sImlhdCI6MTY5MTgyNjMwOH0.DuJclZTi79qLjXaWB7yzXmH7ivmsn8nHUvGeBTmxwTc'
        }
      });

      const json = await responce.json();

      //Delete notes form state
      setNotes(notes.filter((data) => data._id !== id))

      console.log(json.data)

    } catch (error) {
       console.log({error});
    }
    
  }

  return (
    <noteContext.Provider value={{ notes, addNote, editNote, deleteNote, fetchNotes }}>
      {props.children}
    </noteContext.Provider>
  )
}

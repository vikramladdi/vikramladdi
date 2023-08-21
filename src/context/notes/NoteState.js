import React, { useState } from 'react'
import noteContext from './noteContext'

export default function NoteState(props) {

  const backendhost = "http://localhost:5000";

  let inotebook = [];

  const [notes, setNotes] = useState(inotebook);


    //add Note function to Add note
    const addNote = async (inputs) => {
      console.log("Adding a note");
      const fetchurl = `${backendhost}/api/notes/createnote`;
  
      try {
        const responce = await fetch(fetchurl, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
          body: JSON.stringify({
            title: inputs.title,
            description: inputs.description,
            tag: inputs.tag
          })
        });
  
        const json = await responce.json();
        console.log(json.data);
        setNotes(notes.concat(json.data));
        //We can also call function to fetch and update notes in react js
       // fetchNotes()
  
      } catch (error) {
        console.log({ error: error })
      }
  
  
      //setTimeout(()=>{console.log(inputs)},2000)
  
    }
  

  const fetchNotes = async () => {
    const fetchurl = `${backendhost}/api/notes/fetchallnotes`;

    try {
      const responce = await fetch(fetchurl, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });

      const json = await responce.json();
      console.log(json.data)

      setNotes(json.data);

    } catch (error) {
      console.log({ error: error })
    }

  }


  //Edit Note
  const editNotefunc = async (res) => {
    console.log("note is adding", res)

    const fetchurl = `${backendhost}/api/notes/updatenote/${res._id}`;

    try {
      const responce = await fetch(fetchurl, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({
          title: res.title,
          description: res.description,
          tag: res.tag
        })
      });

      const json = await responce.json();
      console.log(json)

      setNotes(
        notes.map((item) => {
          return item._id === res._id ? res : item;
        })
      );

      alert("Note Updated succussfully")


    } catch (error) {
      console.log({ error });
    }


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
          'auth-token': localStorage.getItem('token')
        }
      });

      const json = await responce.json();

      //Delete notes form state
      setNotes(notes.filter((data) => data._id !== id))

      console.log(json.data)

    } catch (error) {
      console.log({ error });
    }

  }

  return (
    <noteContext.Provider value={{ notes, addNote, editNotefunc, deleteNote, fetchNotes }}>
      {props.children}
    </noteContext.Provider>
  )
}

import React, { useState } from 'react'
import noteContext from './noteContext'


export default function NoteState(props) {

  let inotebook = [
    {
      "_id": "64d780e14a5cd77edcd46692",
      "user": "64d72efcce99689ad25464e7",
      "title": "Title 1",
      "description": "Description walk up full stack",
      "tag": "personal",
      "date": "2023-08-12T12:53:53.209Z",
      "__v": 0
    },
    {
      "_id": "64d787a6e67bda0db97e6393c",
      "user": "64d72efcce99689ad25464e7",
      "title": "Title 1",
      "description": "Description walk up full stack",
      "tag": "personal",
      "date": "2023-08-12T13:22:46.774Z",
      "__v": 0
    },
    {
      "_id": "64d780e14a5cd77edcd46649c",
      "user": "64d72efcce99689ad25464e7",
      "title": "Title 1",
      "description": "Description walk up full stack",
      "tag": "personal",
      "date": "2023-08-12T12:53:53.209Z",
      "__v": 0
    },
    {
      "_id": "64d787a6e67bda0db597e639c",
      "user": "64d72efcce99689ad25464e7",
      "title": "Title 1",
      "description": "Description walk up full stack",
      "tag": "personal",
      "date": "2023-08-12T13:22:46.774Z",
      "__v": 0
    }, {
      "_id": "64d780e14a54cd77edcd4669c",
      "user": "64d72efcce99689ad25464e7",
      "title": "Title 1",
      "description": "Description walk up full stack",
      "tag": "personal",
      "date": "2023-08-12T12:53:53.209Z",
      "__v": 0
    },
    {
      "_id": "64d2787a6e67bda0db97e639c",
      "user": "64d72efcce99689ad25464e7",
      "title": "Title 1",
      "description": "Description walk up full stack",
      "tag": "personal",
      "date": "2023-08-12T13:22:46.774Z",
      "__v": 0
    },
    {
      "_id": "64d780e314a5cd77edcd4669c",
      "user": "64d72efcce99689ad25464e7",
      "title": "Title 1",
      "description": "Description walk up full stack",
      "tag": "personal",
      "date": "2023-08-12T12:53:53.209Z",
      "__v": 0
    }
  ];

  const [notes, setNotes] = useState(inotebook);

  //add Note function to Add note
  const addNote = ({title, description, tag}) => {
    console.log("Adding a note");
    const inote = {
      "_id": "64d787a66e67bda0db97e6339c",
      "user": "64d72efcce99689ad25464e7",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2023-08-12T13:22:46.774Z",
      "__v": 0
    };

    setNotes(notes.concat(inote))

    //setTimeout(()=>{console.log(notes)},2000)
    
  }

  //Edit Note
  const editNote = () => {

  }

  //Delete Note
  const deleteNote = (id) => {
    console.log("delete id"+' '+id);

    setNotes(notes.filter((data)=>data._id!==id))

  }

  return (
    <noteContext.Provider value={{ notes, addNote, editNote, deleteNote }}>
      {props.children}
    </noteContext.Provider>
  )
}

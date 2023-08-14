import React, { useState } from 'react'
import noteContext from './noteContext'


export default function NoteState(props) {

    let inotebook = [
        {
          "_id": "64d780e14a5cd77edcd4669c",
          "user": "64d72efcce99689ad25464e7",
          "title": "Title 1",
          "description": "Description walk up full stack",
          "tag": "personal",
          "date": "2023-08-12T12:53:53.209Z",
          "__v": 0
        },
        {
          "_id": "64d787a6e67bda0db97e639c",
          "user": "64d72efcce99689ad25464e7",
          "title": "Title 1",
          "description": "Description walk up full stack",
          "tag": "personal",
          "date": "2023-08-12T13:22:46.774Z",
          "__v": 0
        },
        {
            "_id": "64d780e14a5cd77edcd4669c",
            "user": "64d72efcce99689ad25464e7",
            "title": "Title 1",
            "description": "Description walk up full stack",
            "tag": "personal",
            "date": "2023-08-12T12:53:53.209Z",
            "__v": 0
          },
          {
            "_id": "64d787a6e67bda0db97e639c",
            "user": "64d72efcce99689ad25464e7",
            "title": "Title 1",
            "description": "Description walk up full stack",
            "tag": "personal",
            "date": "2023-08-12T13:22:46.774Z",
            "__v": 0
          }, {
            "_id": "64d780e14a5cd77edcd4669c",
            "user": "64d72efcce99689ad25464e7",
            "title": "Title 1",
            "description": "Description walk up full stack",
            "tag": "personal",
            "date": "2023-08-12T12:53:53.209Z",
            "__v": 0
          },
          {
            "_id": "64d787a6e67bda0db97e639c",
            "user": "64d72efcce99689ad25464e7",
            "title": "Title 1",
            "description": "Description walk up full stack",
            "tag": "personal",
            "date": "2023-08-12T13:22:46.774Z",
            "__v": 0
          },
          {
              "_id": "64d780e14a5cd77edcd4669c",
              "user": "64d72efcce99689ad25464e7",
              "title": "Title 1",
              "description": "Description walk up full stack",
              "tag": "personal",
              "date": "2023-08-12T12:53:53.209Z",
              "__v": 0
            },
            {
              "_id": "64d787a6e67bda0db97e639c",
              "user": "64d72efcce99689ad25464e7",
              "title": "Title 1",
              "description": "Description walk up full stack",
              "tag": "personal",
              "date": "2023-08-12T13:22:46.774Z",
              "__v": 0
            }
      ];

    const [notes,setNotes] = useState(inotebook);

    // Using ES6 {notes,setNotes} means like {notes:notes, setNotes:setNotes}

  return (
    <noteContext.Provider value={{notes,setNotes}}>
        {props.children}
    </noteContext.Provider>
  )
}

import React from 'react'
import noteContext from './noteContext'


export default function NoteState(props) {

  return (
    <noteContext.Provider value={""}>
        {props.children}
    </noteContext.Provider>
  )
}

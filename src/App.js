import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {

 const [alert,setAlert] =  useState({type:"",message:""})

 //Send a function as Props and get Messages OR Responce back App.js
  const showAlert = ({type,message}) => {
    setAlert({
      type,
      message
    });

    setTimeout(()=>{
      setAlert({type:"",message:""})
    },3000)

  };

  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alert alert={alert}/>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login showAlert={showAlert} />} /> 
            <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} />
          </Routes>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;

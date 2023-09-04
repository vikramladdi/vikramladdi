import React,{useState} from 'react'
import Navbar from './Component/Navbar';
import News from './Component/News';
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import './App.css';

function App() {
   const [progress,setProgress] = useState(0);

  return (
    <div>
    <BrowserRouter>
    <Navbar />
    <LoadingBar
    color='#f11946'
    progress={progress}
    />
    <Routes>
        <Route exact path="/"  element={<News setprogress={setProgress} key="home"  country="in" category=""/>} />
        <Route exact path="/business"  element={<News setprogress={setProgress}  key="business"  country="in" category="business"/>} />
        <Route exact path="/entertainment"element={<News setprogress={setProgress}   key="entertainment"   country="in" category="entertainment"/>} />
        <Route exact path="/general"  element={<News setprogress={setProgress}  key="general"  country="in" category="general"/>} />
        <Route exact path="/health" element={<News setprogress={setProgress}  key="health"   country="in" category="health"/>} />
        <Route exact path="/science"  element={<News setprogress={setProgress}  key="science"  country="in" category="science"/>} />
        <Route exact path="/sports" element={<News setprogress={setProgress}  key="sports"  country="in" category="sports"/>} />
        <Route exact path="/technology" element={<News setprogress={setProgress}  key="technology"  country="in" category="technology"/>} />
    </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;

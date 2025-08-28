import Doors  from './pages/Doors.jsx';
import Login from './pages/Login.jsx';
import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route,Navigate, Router} from "react-router-dom"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Navigate to="/doors" replace />}></Route>
      <Route path='/doors' element={<Doors/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      {/* <Route path='/signup' element={<SignUp/>}></Route> */}
      
    </Routes>
  </BrowserRouter>
)

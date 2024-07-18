import React from 'react'
import Register from './pages/Register'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Content from './pages/Content';
import Login from './pages/Login';
import Avatar from './pages/Avatar';

export default function App() {
  return (
    <div>
        <Router>
      <Routes>
        <Route exact path="/register" element={<Register />} />
         <Route path="/login" element={<Login />} />
        <Route path="/avatar" element={<Avatar />} /> 
        <Route path="/" element={<Content />} /> 
      </Routes>
    </Router>
    </div>
  )
}

import "./App.css"
import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./UserPortals/Login";
import Signup from "./UserPortals/Signup"
import Home from "./Home";
function App() {

  return (
    <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home/>}/>
        </Routes>
    </Router>           
  )

}

export default App

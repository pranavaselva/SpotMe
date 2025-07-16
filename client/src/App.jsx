import "./App.css"
import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./UserPortals/Login";
import Signup from "./UserPortals/Signup"
function App() {

  return (
    <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
    </Router>           
  )

}

export default App

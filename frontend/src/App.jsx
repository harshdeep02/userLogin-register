import { useState } from 'react'
import './App.css'
import { RegisterUser } from './Components/RegisterUser'
import { Login } from './Components/Login'
import { Link } from 'react-router'

function App() {

  return (
   <>
   <div className="auth-buttons-container">
   <Link to="/register"><button className="auth-button registerbtn">Register</button></Link>
      <Link to="/login"><button className="auth-button loginbtn">Login</button></Link>
    </div>
   </>  
  )
}

export default App

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import './RegisterUser.css'
import spinner from "../assets/spinner2.gif";


export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [responseJson , setResponseJson] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate();

//login user
    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true)
   
        const response = await fetch("https://userlogin-register-backend.onrender.com/login", {
           method: "POST",
           headers: {
               "Content-Type": "application/json"
           },
           body: JSON.stringify({email, password })
       });
       //get response
       const json = await response.json();
       if(json.sucessResult){
         const userData= 
               {name:json.findUser.name,
                 email:json.findUser.email,
                 dob:json.findUser.dob,
                 token:json.authToken
               }
        // saved userData in localStorage
         const saved = localStorage.setItem("userData", JSON.stringify(userData))
         setLoading(false)
         setError("")
         navigate('/users')
         }
         else{
           setLoading(false)
          setError(json.error);
         }
      };
  return (
    <>
        {loading?<div className="spinner loginSpinner"><img src={spinner} alt="" /></div>:""}

        <div className="login-container">
        <div className="login-box">

        <div className="login-header">SIGN IN</div>
        <div className='error'>{error}</div> 
        <div className="avatar">
            <i className="fa-solid fa-user fa-2xl userIcon" style={{color: "#828aa5"}}></i>
        </div>

        <form onSubmit={handleSubmit}>
            <div className="input-field">
            <label htmlFor='email'>
            <input type="email" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
            </label>
            </div>
            <div className="input-field">
            <label htmlFor='password'>
            <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
            </label>
            </div>
            <div className="options">
            <label>
                <input type="checkbox"/> Remember me
            </label>
            <a href="#">Forgot your password?</a>
            </div>
            <button type="submit" className="login-button">LOGIN</button>
        </form>
        <div className='alreadyAccount'>Don't have an account? <Link to="/register">Register Now</Link></div>

        </div>
    </div>
        </>
  )
}

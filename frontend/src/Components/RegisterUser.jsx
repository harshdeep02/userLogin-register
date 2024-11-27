import React, { useState } from 'react'
import "./RegisterUser.css"
import { Link, useNavigate } from 'react-router'
import spinner from "../assets/spinner2.gif";


export const RegisterUser = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [dob, setDob] = useState('')
    const [responseJson , setResponseJson] = useState(null)
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState('')
   const navigate = useNavigate();


//register user
   const handleSubmit = async (e) => {
    e.preventDefault();

     setLoading(true)

     try{
     const response = await fetch("http://127.0.0.1:5000/register", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, email, password, dob})
    })
    const json = await response.json();
    console.log(json);
    
    if(json.sucessResult){
        setResponseJson(json)
        setLoading(false)
        navigate('/login')
        setError("")
     }
     else{
        setLoading(false)
        setError(json.errors);
       }
     
    }
    catch(error){
        console.log(error);
    } 
};

return (
    <>
     {loading?<div className="spinner loginSpinner"><img src={spinner} alt="" /></div>:""}
    <div className="regs-container">
    <div className="regs-box">

    <div className="regs-header">SIGN UP</div>
    <div className='error'>{error}</div>
    <div className="avatar">
        <i className="fa-solid fa-user fa-2xl userIcon" style={{color: "#828aa5"}}></i>
    </div>

    <form onSubmit={handleSubmit}>
        <div className="input-field">
        <label htmlFor='name'>
        <input type="text" placeholder="name" value={name} onChange={(e)=>setName(e.target.value)} required/>
        </label>
        </div>
        <div className="input-field">
        <label htmlFor='email'>
        <input type="email" placeholder="email"value={email} onChange={(e)=>setEmail(e.target.value)} required/>
        </label>
        </div>
        <div className="input-field">
        <label htmlFor='dob'>
        <input type="date" placeholder="DOB" value={dob} onChange={(e)=>setDob(e.target.value)} required/>
        </label>
        </div>
        <div className="input-field">
        <label htmlFor='password'>
        <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
        </label>
        </div>
        <button type="submit" className="regs-button">REGISTER</button>
    </form>
<div className='alreadyAccount'>Already have an account?<Link to="/login">Login</Link></div>
    </div>
</div>
    </>
)
}

import React, { useState } from 'react'
import { usersData } from '../../usersData'
import './Users.css'
import logout from '../assets/LogOut.png'
import { useNavigate } from 'react-router'

export const Users = () => {
    const userData = localStorage.getItem('userData')
    const parseData = JSON.parse(userData)
    const navigate = useNavigate();
    const [user, setUser] = useState(false)
    if(!userData){
        navigate('/')
        return;
    }

    const handleLogOut = ()=>{ 
        localStorage.removeItem("userData");
        navigate('/')

    }

  return (
    <>
    <div className="userDet">
    <h2>Loged In User Details</h2>
        <p>Name:<span> {parseData?.name}</span></p>
        <p>Email:<span>{parseData?.email}</span></p>
        <p>DOB: <span>{parseData?.dob}</span> </p>

    </div>

    <button className="logOutMain" onClick={handleLogOut}>
                  <img src={logout} alt="logOut" />
                <div className="logOutText">{parseData?.name}</div>
                </button>

      <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>DOB</th>
                  </tr>
                </thead>
                <tbody className="mainTable">
                  {usersData?.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.dob}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
    </>

)
}

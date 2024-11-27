import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router";
import App from './App.jsx'
import { RegisterUser } from './Components/RegisterUser.jsx';
import { Login } from './Components/Login.jsx';
import { Users } from './Components/Users.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/register",
    element: <RegisterUser />,
  },
  { path: "/login",
    element: <Login />
  },
  {
    path: "/users",
    element:<Users/>
  }
]);


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <RouterProvider router={router} />
</React.StrictMode>,
)

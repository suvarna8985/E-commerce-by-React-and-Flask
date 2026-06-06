import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

export default function ProtectRoute({children}) {
    const navigate=useNavigate()
    const user=JSON.parse(localStorage.getItem("admin"))

    return user?children:navigate("/login")
    // if(!user){
    //     return navigate("/loginpage")
    // }
    // return children

  return (
    <div>
      ProtectRoute
    </div>
  )
}

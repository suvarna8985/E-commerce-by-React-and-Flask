import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate=useNavigate()
  const [formData,setFormData]=useState({
    email:'',
    password:''
  })



  function handleChange(e){
       setFormData(
        {
          ...formData,
          [e.target.name]:e.target.value
        }
       ) ;
  }
  async function handleSubmit(e){
    e.preventDefault();
    try{
      const res=await axios.post("https://ecomflask.duckdns.org/api/admin/login",
        formData,
        {
          withCredentials:true
        }
      )
      console.log(res.data);
      localStorage.setItem("admin",JSON.stringify(res.data.admin));

      navigate("/dashboard")


    }
    catch(error){
      console.log(error.response?.data || error.message);
      alert("login failed")
    }

  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text"
      placeholder='Enter email'
      name="email"
      value={formData.email}
      onChange={handleChange} />

      <input type="password"
      placeholder='Enter password'
      name="password"
      value={formData.password}
      onChange={handleChange} />
      <button>Login</button>
      </form>
    </div>
  )
}










// import React from 'react'
// import { useState } from 'react'
// import { Navigate, useNavigate } from 'react-router-dom';

// export default function LoginPage() {

//     const [user,setuser] = useState("");
//     const navigate=useNavigate()

//     function handleSubmit(){
//         console.log(user);
//         const userdata={
//             username:user
//         }
//         localStorage.setItem("user",JSON.stringify(userdata))
//         navigate("/products")


//     }
//     // function handlechange(e){
//     //     setUser(e.target.value);
//     //     console.log(e)
//     // }//   onChange={handlechange}
//   return (
//     <div>

//  <h1>Login Pge</h1>

//  <input type="text"
//  placeholder="enter your name"
//  value={user}
//  onChange={e=>setuser(e.target.value)}
  
//  />
//  <button onClick={handleSubmit}>submit</button>

//     </div>
//   )
// }

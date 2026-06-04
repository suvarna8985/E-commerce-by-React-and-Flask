import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Register() {

  const navigate=useNavigate()

  const [registerData,setRegisterData]=useState({
    username:"",
    useremail:"",
    useraddress:"",
    userpassword:"",
    useragree:""
  })

  function handleChange(event){
    // console.log(event);
    const {name,value,type,checked}=event.target

    // setRegisterData({
    //   ...registerData,
    //   [name]:type==="checkbox"?checked:value
    // })
     setRegisterData({
      ...registerData,
       [name]:type==="checkbox"?checked:value
    })

  }


  async function handleSubmit(e){
    e.preventDefault()
    console.log(registerData);

    try{
    let response= await axios.post("https://ecomflask.duckdns.org/api/admin/register",registerData)
   console.log(response.data);
   alert("otp sent succeffulyy");
   localStorage.setItem("token",JSON.stringify(response.data.token))
   navigate("/verify-otp",{
    state:{
      token:response.data.token
    }}
   )
   
    
  }
    catch(error){
console.log(error.response?.data || error.message)
        alert("registartionfailed")
    }
  
  }

  // async fn mani(){
  //   try{

  //   }
  //   catch(){

  //   }
  // }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
         <input type="text" 
         placeholder='enter your name'
         name="username"
         value={registerData.username}
         onChange={handleChange}
        />
       </div>
      

      <div>
         <input type="email" 
         placeholder='enter your email'
         name="useremail"
         value={registerData.useremail}
         onChange={handleChange}
        />
      </div>

      <div>
         <input type="text" 
         placeholder='enter your address'
         name="useraddress"
         value={registerData.useraddress}
         onChange={handleChange}
        />
      </div>

      <div>
         <input type="password" 
         placeholder='enter your password'
         name="userpassword"
         value={registerData.userpassword}
         onChange={handleChange}
        />
      </div>

      <div>
         <input type="checkbox" 
         name="useragree"
         checked={registerData.useragree}
         onChange={handleChange}
        />
        </div>

<button>Register</button>
      </form>
    </div>
  )
}

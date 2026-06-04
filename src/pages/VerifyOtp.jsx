import React from 'react'
import { useState } from 'react'
import {useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios';


export default function VerifyOtp(){

  const location=useLocation();
  const navigate=useNavigate();
  const registerdtoken=location.state?.token||""

  const [otpData,setOtpData]=useState({

    otp:"",
    token:registerdtoken
  })


  function handleChange(e){
    setOtpData({
      ...otpData,                      //{"",abc,}
      [e.target.name]:e.target.value
    }
    )

  }

  async function handleSubmit(e){
    e.preventDefault();
    // console.log("otpData",otpData)
    try{
      const response= await axios.post("https://ecomflask.duckdns.org/api/admin/verify-otp",otpData,
        {
          headers:{
            "Content-type":"application/json"
          }
        }
      )

      console.log(response.data)
      alert("admin registerd successufully");
      localStorage.removeItem("token");
      navigate("/login")

    }
    catch(error){
        console.log(error.response?.data || error.message)
        alert("otp verification failed")
    }

  }


  return (
    <div>
     <form onSubmit={handleSubmit}>

      <input type="text"
      placeholder='enter your OTP'
      name="otp"
      value={otpData.otp}
      onChange={handleChange}
      />
      <button>Send OTP</button>

     </form>
    </div>
  )
}

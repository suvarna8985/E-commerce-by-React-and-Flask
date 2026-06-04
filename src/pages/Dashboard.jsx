import React from 'react'

export default function Dashboard() {
    const admin_data=JSON.parse(localStorage.getItem("admin"))
    console.log(admin_data)
  return (
    <div>
        <h1>Admin Dashboard</h1>
        <h2>Welcome : {admin_data?.adminemail}</h2>
        <h3>Admin Id : {admin_data?.adminid}</h3>
      <button>go to admin products</button>
    </div>
  )
}

// admin_data?.adminemail
// if(admin){
//     admin.adminemail
// }
// else{
//     undefined
// }
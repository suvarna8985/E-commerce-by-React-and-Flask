import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import Cart from './pages/Cart'
import Register from './pages/Register'
import Products from './pages/Products'
import Navbar from './pages/Navbar'
import ProtectRoute from './pages/ProtectRoute'
import VerifyOtp from './pages/VerifyOtp'
import Dashboard from './pages/Dashboard'
import AddProducts from './pages/AddProducts'
import AdminProduct from './pages/AdminProduct'
import SingleProduct from './pages/SingleProduct'
import EditProduct from './pages/EditProduct'

export default function App() {
  return (
   <BrowserRouter>
   <Navbar/>
<Routes>
<Route path="/" element={<Home/>}/>
<Route path="/cart" element={<Cart/>}/>
<Route path="/login" element={<LoginPage/>}/>
<Route path="/products" element={
  <ProtectRoute>
    <Products/>
  </ProtectRoute>
}/>
<Route path="/register" element={<Register/>}/>

<Route path="/verify-otp" element={<VerifyOtp/>}/>
<Route path="/dashboard" element={<Dashboard/>}/>
<Route path="/addproducts" element={<AddProducts/>}/>
<Route path="/admin-products" element={<AdminProduct/>}/>
<Route path="/singleproduct/:id" element={<SingleProduct/>}/>
<Route path="/editproduct/:id" element={<EditProduct/>} />

</Routes>
   </BrowserRouter>
  )
}

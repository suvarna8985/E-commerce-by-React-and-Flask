import React from 'react'
import { useState } from 'react'
import axios from 'axios';

export default function AddProducts() {
    const[formData,setFormData]=useState({
        title :"",
        Description :"",
        About_item:"",
        quantity:"",
        price :"",
        category :""

        
    })
    const [file,setFile]=useState(null)
    function handleChange(e){
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }
   async function handleSubmit(e){
        e.preventDefault();
        try{
            const data = new FormData(); 
data.append("title",formData.title); 
data.append("Description",formData.Description); 
data.append("About_item",formData.About_item); 
data.append("quantity",formData.quantity); 
data.append("price",formData.price); 
data.append("category",formData.category); 
data.append("file",file); 
            const result=await axios.post("https://ecomflask.duckdns.org/api/admin/add-item",data,
                {
                    withCredentials:true,
                    headers:{
                        "Content-Type":"multipart/form-data"
                    }
                }
            )
            console.log(result.data)

        //     setFormData({
        //         title :"",
        // Description :"",
        // About_item:"",
        // quantity:"",
        // price :"",
        // category :""
        //     })
        //     setFile(null)
        // 
        }
        catch(error){
                console.log(error.result.data);

        }

    }
  return (
    <div>
      
      <form onSubmit={handleSubmit}>
      <h2>Add Product</h2>
      <div>
        <label>Product Title</label>
        <input type="text" 
        name="title"
        placeholder='Enter product title'
        value={formData.title} 
        onChange={handleChange}/>
      </div>
      <div>
        <label>Description</label>
        <input type="text" 
        name="Description"
        placeholder='Enter product Description'
        value={formData.Description} 
        onChange={handleChange}/>

      </div>
      <div>
        <label>About item </label>
        <input type="text" 
        name="About_item"
        placeholder='Enter  About Product '
        value={formData.About_item} 
        onChange={handleChange}/>
        
      </div>
      <div>
        <label>Quantity  </label>
        <input type="text" 
        name="quantity"
        placeholder='Enter quantity'
        value={formData.quantity} 
        onChange={handleChange}/>
        
      </div>
      
      <div>
        <label>Price</label>
        <input type="text" 
        name="price"
        placeholder='Enter price  '
        value={formData.price} 
        onChange={handleChange}/>
        
      </div>
      <div>
        <label>Category</label>
        <input type="text" 
        name="category"
        placeholder='Enter category'
        value={formData.category} 
        onChange={handleChange}/>
        
      </div>
      <div>
        <label>Upload Image </label>
        <input type="file" 
        onChange={(e)=>setFile(e.target.files[0])}/>
        
      </div>
      <button>submit</button>
      </form>
    </div>
  )
}

import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function EditProduct() {
  const { id } = useParams();
  const navigate=useNavigate()

  const [formData, setFormData] = useState({
      title: "",
      Description: "",
      About_item: "",
      quantity: "",
      price: "",
      category: ""
    });
    const [file, setFile] = useState(null);
    function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function getProduct(){
      try{
        const result=await axios.get(`https://ecomflask.duckdns.org/api/admin/item/${id}`,
          {
            withCredentials:true
          }
        )
        console.log(result.data.product)
        const p=result.data.product
        setFormData({
             title: p.itemname,
      Description: p.item_desc,
      About_item: p.item_about,
      quantity: p.quantity,
      price: p.price,
      category: p.category
        });
      }
      catch(error){
        console.log(error.response?.data || error.message);
      }
  }
  useEffect(()=>{
    getProduct();
  },[])
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("Description", formData.Description);
      data.append("About_item", formData.About_item);
      data.append("quantity", formData.quantity);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("file", file);

      if(file){
        data.append("file",file);
      }

       
      const result = await axios.put(
        `https://ecomflask.duckdns.org/api/admin/update-item/${id}`,
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      )
      alert("updated successfully");
      navigate("/admin-products")


      console.log(result.data);
      alert("Product updated Successfully");
    } catch (error) {
     console.log(error.response?.data || error.message);
    }
  }

  return (
    <div>
      <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">

          <div className="card shadow">
            <div className="card-body">

              <h2 className="text-center mb-4">Add Product</h2>

              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label className="form-label">Product Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    placeholder="Enter Product Title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    name="Description"
                    placeholder="Enter Product Description"
                    value={formData.Description}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label">About Item</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    name="About_item"
                    placeholder="Enter About Product"
                    value={formData.About_item}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Quantity</label>
                    <input
                      type="number"
                      className="form-control"
                      name="quantity"
                      placeholder="Enter Quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Price</label>
                    <input
                      type="number"
                      className="form-control"
                      name="price"
                      placeholder="Enter Price"
                      value={formData.price}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <input
                    type="text"
                    className="form-control"
                    name="category"
                    placeholder="Enter Category"
                    value={formData.category}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Upload Image</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                >
                  Update Product
                </button>

              </form>

            </div>
          </div>

        </div>
      </div>
    </div>
  

    </div>
  )
}

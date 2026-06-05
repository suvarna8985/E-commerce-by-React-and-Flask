import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

export default function AdminProduct() {
    const navigate=useNavigate()
  const [products, setProducts] = useState([]);

  async function getProducts() {
    try {
      const result = await axios.get(
        "https://ecomflask.duckdns.org/api/admin/items",
        {
          withCredentials: true,
        }
      );

      setProducts(result.data.products);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  async function deleteProduct(id){
    try{

        const res=await axios.delete(`https://ecomflask.duckdns.org/api/admin/delete-item/${id}`,
            {
                withCredentials:true
            }
        )
        alert(res.data.message);
        getProducts();


    }
    catch(error){

    }
  }
  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Admin Products</h1>

      <div className="row">
        {products.map((item) => (
          <div className="col-md-4 mb-4" key={item.itemid}>
            <div className="card h-100 shadow">
              <img
                src={item.image}
                alt={item.itemname}
                className="card-img-top"
                style={{ height: "250px", objectFit: "cover" }}
              />

              <div className="card-body">
                <h5 className="card-title">{item.itemname}</h5>
                <p className="card-text">{item.item_desc}</p>
                <h4 className="text-success">₹{item.price}</h4>
              </div>

              <div className="card-footer d-flex justify-content-between">
                <button className="btn btn-primary" onClick={()=>navigate(`/singleproduct/${item.itemid}`)}>View</button>
                <button className="btn btn-warning" onClick={()=>navigate(`/editproduct/${item.itemid}`)}>Edit</button>
                <button className="btn btn-danger" onClick={()=>deleteProduct(item.itemid)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
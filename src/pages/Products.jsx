import React, { useState,useEffect,useMemo } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { fetchProducts } from './store/slices/ProductSlice'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Products() {
  const {items,loading,error}=useSelector((state)=>state.Products);
  const dispatch=useDispatch();
  const [search,setSearch]=useState("");
  const filteredProducts=useMemo(()=>{
      return items.filter((i)=>
        i.category.toLowerCase().includes(search.toLowerCase())
      );
  },[items,search])

useEffect(()=>{
  dispatch(fetchProducts());
},[]);

if(error){
  return <h2>{error}</h2>
}
if(loading){
  return (
    <div>
      <h2>Loading.................</h2>
    </div>
  );
}



return (
  <div className="container mt-4">
    <h1 className="text-center mb-4">Products</h1>

    <div className="row justify-content-center mb-4">
      <div className="col-md-6">
        <input
          type="text"
          className="form-control"
          placeholder="Search by category"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>

    <div className="row">
      {filteredProducts.map((k) => (
        <div className="col-md-4 col-lg-3 mb-4" key={k.itemid}>
          <div className="card h-100 shadow-sm">
            <img
              src={k.image}
              alt={k.itemname}
              className="card-img-top p-3"
              style={{ height: "220px", objectFit: "contain" }}
            />

            <div className="card-body">
              <span className="badge bg-primary mb-2">
                {k.category}
              </span>

              <h5 className="card-title">{k.itemname}</h5>

              <h4 className="text-success">₹{k.price}</h4>

              <p className="card-text">
                Quantity: {k.quantity}
              </p>

              <button className="btn btn-dark w-100">
                View Product
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}

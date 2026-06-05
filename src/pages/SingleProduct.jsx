import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function SingleProduct() {
  const [product, setProduct] = useState(null);

  const { id } = useParams();

  async function getSingleProduct() {
    try {
      const res = await axios.get(
        `https://ecomflask.duckdns.org/api/admin/item/${id}`,
        {
          withCredentials: true,
        }
      );

      setProduct(res.data.product);
    } catch (error) {
     console.log(error.response?.data || error.message);
    }
  }

  useEffect(() => {
    getSingleProduct();
  }, []);

  if (!product) {
    return (
      <div className="container text-center mt-5">
        <div
          className="spinner-border text-primary mb-3"
          role="status"
        ></div>
        <h3>Loading Product...</h3>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="card shadow-lg border-0">
        <div className="row g-0">

          {/* Product Image */}
          <div className="col-md-5">
            <img
              src={product.image}
              alt={product.itemname}
              className="img-fluid rounded-start w-100"
              style={{
                height: "500px",
                objectFit: "cover",
              }}
            />
          </div>

          {/* Product Details */}
          <div className="col-md-7">
            <div className="card-body p-4">

              <h1 className="card-title mb-3">
                {product.itemname}
              </h1>

              <p className="text-muted fs-5">
                {product.item_desc}
              </p>

              <hr />

              <h5 className="fw-bold">About Product</h5>

              <p className="mb-4">
                {product.item_about}
              </p>

              <h2 className="text-success fw-bold mb-4">
                ₹{product.price}
              </h2>

              <div className="d-flex gap-3 mb-4">
                <span className="badge bg-primary p-2">
                  Quantity: {product.quantity}
                </span>

                <span className="badge bg-secondary p-2">
                  {product.category}
                </span>
              </div>

        

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
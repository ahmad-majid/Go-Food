import React, { useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

export default function Card(props) {
  const dispatch = useDispatchCart();
  const data = useCart();
  const option = props.options ?? {};
  const priceOptions = Object.keys(option);
  const [qty, setQty] = useState(props.qty || 1); // Use qty from props or default to 1
  const [size, setSize] = useState(props.size || ""); // Use size from props or default to empty string

  const handleAddtoCart = async () => {
    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: props.foodItem.finalPrice,
      qty: qty,
      size: size,
    });
    console.log(data);
  };

  return (
    <div>
      <div>
        <div
          className="card mt-3"
          style={{ width: "18rem", maxHeight: "360px" }}
        >
          <img
            src={props.foodItem.img}
            className="card-img-top"
            alt="..."
            style={{ height: "150px", objectFit: "fill" }}
          />
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>
            <select
              className="m-2 h-100 rounded"
              style={{ background: "#28a745" }}
              onChange={(e) => {
                setQty(e.target.value);
              }}
              value={qty}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>

            <select
              className="m-2 h-100 rounded"
              style={{ background: "#28a745" }}
              onChange={(e) => {
                setSize(e.target.value);
              }}
              value={size}
            >
              {priceOptions.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
            <div className="d-inline h-100 fs-5">Total Price</div>
          </div>
          <hr />
          <div className="justify-content-center mb-2">
            <button
              className="btn btn-success ms-2"
              style={{ fontWeight: "bold" }}
              onClick={handleAddtoCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Card from "../Components/Card";

export const Home = () => {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState("");

  const loadData = async () => {
    let response = await fetch("http://localhost:4000/api/foodData", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
    console.log(response[0], response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <div>
      <div>
        <Navbar />
      </div>
      {/*-----carousal ---*/}

      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        style={{ objectFit: "contain !important" }}
      >
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption text-white" style={{ zIndex: "10" }}>
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              {/* <button className="btn btn-outline-success" type="submit">
                Search
              </button> */}
            </div>
          </div>

          <div className="carousel-item active">
            <img
              src="https://source.unsplash.com/random/900x700?burger"
              className="d-block w-100"
              style={{ filter: "brightness(30%)" }}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/900x700?pastry"
              className="d-block w-100"
              style={{ filter: "brightness(30%)" }}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/900x700?barbeque"
              className="d-block w-100"
              style={{ filter: "brightness(30%)" }}
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/*-----card data ---*/}
      <div className="container">
        {foodCat.map((category) => {
          const filteredItems = foodItem.filter(
            (item) =>
              item.CategoryName === category.CategoryName &&
              item.name.toLowerCase().includes(search.toLowerCase())
          );

          if (filteredItems.length === 0) {
            return null; // Skip rendering if no items match the criteria
          }

          return (
            <div className="row mb-3" key={category._id}>
              <div className="fs-3 m-3">{category.CategoryName}</div>
              <hr />
              {filteredItems.map((item) => (
                <div key={item._id} className="col-12 col-md-6 col-lg-3">
                  <Card
                    foodItem={item}
                    options={item.options[0]}  
                  />
                </div>
              ))}
            </div>
          );
        })}
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

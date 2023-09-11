import React, { useState } from "react";
import { Link } from "react-router-dom";

function SignUp() {
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    geolocation: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation,
      }),
    });
    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter Valid Credentials");
    }
  };
  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label for="name">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={credentials.name}
              onChange={onChange}
              placeholder="Enter Your Name"
            />
          </div>
          <div className="mb-3">
            <label for="name">Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              value={credentials.email}
              onChange={onChange}
              placeholder="Enter email"
            />
          </div>
          <div className="mb-3">
            <label for="Password">Address</label>
            <input
              type="text"
              className="form-control"
              name="geolocation"
              value={credentials.geolocation}
              onChange={onChange}
              placeholder="Password"
            />
          </div>
          <div className="mb-3">
            <label for="Password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={credentials.password}
              onChange={onChange}
              placeholder="Password"
            />
          </div>

          <button type="submit" className="m-3 btn btn-primary">
            Submit
          </button>
          <Link to="/login" className="m-3 btn btn-danger">
            Already a user
          </Link>
        </form>
      </div>
    </>
  );
}

export default SignUp;

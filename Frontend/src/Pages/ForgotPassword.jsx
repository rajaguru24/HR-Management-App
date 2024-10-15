import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hello");
    try {
      const response = await axios.post(
        "https://hr-management-app.onrender.com/api/user/ForgotPassword",
        { email }
      );
      console.log(response);
      setMessage(response.data.message);
    } catch (error) {
      setMessage("error sending password reset link");

      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="bg-green p-3 rounded w-24">
        <h3>Forgot Password</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            send
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};
export default ForgotPassword;

import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignIn = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const payload = { email, password };

  const handleSubmit = async (e) => {
    e.preventDefault();

  
    await axios.post("http://localhost:5000/api/user/signin-user", payload)
      .then((res) => {
        setMessage(res.data.message);
        setToken(res.data.token);
      })
       .catch((error) => {
        setMessage(error.data.message);
  });

      setEmail('')
      setPassword('')

      setTimeout(() => {
        navigate("/home");
      }, 1000);


  };

  return (
    <div style={{ backgroundColor: "cyan" }}>
      <form className="container-fluid text-center " onSubmit={handleSubmit}>
        <div className="row mb-3">
          <fieldset>
            <strong>SignIn</strong>
            <p>
              <label htmlFor="email" className="">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your Email Id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </p>
            <p>
              <label htmlFor="Password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </p>
            <button className="btn btn-success" type="submit">
              SignIn
            </button>
          </fieldset>
        </div>
      </form>
      <br />
      <div className="container-fluid ">
        <button className="d-grid gap-1 col-3 mx-auto">
          {" "}
          <Link to="/">Back</Link>
        </button>
        <br />
        <button className="d-grid gap-2 col-3 mx-auto ">
          <Link to="/OTP" className="">
            Forgot Password
          </Link>
        </button>
      </div>
      <h2>{message}</h2>
    </div>
  );
};

export default SignIn;

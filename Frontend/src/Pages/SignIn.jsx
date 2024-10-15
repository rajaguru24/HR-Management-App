import React, { useState } from "react"; 
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { email, password }; 
     await axios.post("https://hr-management-app.onrender.com/api/user/signin-user", payload)
      .then((res) => {
        toast.success(res.data.message);
        setToken(res.data.token)
      })
       .catch((error) => {
        toast.error(error?.data?.message);
  });
        setTimeout(() => {
        navigate("/home");
      }, 2000);

      setEmail('');
      setPassword('');
  };
  

  return (
    <div style={{ backgroundColor: "cyan" }}>
      <form className="container-fluid d-flex justify-content-center align-items-center" onSubmit={handleSubmit}>
        <div>
          <fieldset><div className="d-flex justify-content-center" style = {{fontSize:"24px"}}><strong>SignIn</strong>
            </div>
            <p className="" >
            <label htmlFor="email"className="col-sm-4" ><strong>Email Id:</strong></label>
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="off"
              placeholder="Enter your Email Id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </p>
          <p>
            <label htmlFor="Password" className="col-sm-4"><strong>Password: </strong></label>
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="off"
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
        
          <Link to="/">Back</Link>
        </button>
        <br />
        <button className="d-grid gap-2 col-3 mx-auto ">
          <Link to="/ForgotPassword" className="">
            Forgot Password
          </Link>
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignIn;

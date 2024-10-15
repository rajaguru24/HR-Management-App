import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const payload = { username, email, password };
    await axios.post("/api/user/signup-user", payload)
      .then((res) => {
        toast.success(res.data.message)
      })
      .catch((error) => {
        console.log(error); 
        toast.error(error?.data?.message);
      });
      setUsername('')
      setEmail('')
      setPassword('')

setTimeout(()=>{
  navigate('/SignIn')
},2000)
      
      
      
    };
  return (
    <div className=""style={{backgroundColor:"green"}}>
      <form 
        className="  container-fluid d-flex justify-content-center align-items-center" onSubmit={handleSubmit}>
        <fieldset>
          <div className="d-flex justify-content-center" style = {{fontSize:"24px"}}><strong>SignUp</strong></div>
          <p>
            <label htmlFor="username" className="col-sm-4"><strong>Username:</strong></label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </p>
          <p className="" >
            <label htmlFor="email"className="col-sm-4" ><strong>Email Id:</strong></label>
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
            <label htmlFor="Password" className="col-sm-4"><strong>Password: </strong></label>
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
          
          <div className="container-fluid d-flex justify-content-center align-items-center">
            <button className="btn btn-primary " type="submit">
              SignUp
            </button>
          </div>
        </fieldset>
      </form>
      <br/>
      <div className="container-fluid ">

      <button className="d-grid gap-1 col-3 mx-auto" > <Link to="/">Back</Link></button>
      <br />

      <button className="d-grid gap-2 col-3 mx-auto ">
        <Link to="/ForgotPassword" className="">Forgot Password</Link>
      </button>
      </div>

      <br/>
      <ToastContainer />
    </div>
  );
};

export default SignUp;

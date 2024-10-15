import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeeManagementApp from "./Components/EmployeeManagementApp";
import EmployeeDetails from "./Components/EmployeeDetails";
import Signin from "./Pages/SignIn";
import Signup from "./Pages/SignUp";
import Home from "./Pages/Home";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import axios from "axios";
// axios.defaults.withCredentials = true;
function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/resetpassword/:token" element={<ResetPassword />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin setToken={setToken} />} />
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<EmployeeManagementApp />} />
          <Route path="/:id" element={<EmployeeDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;

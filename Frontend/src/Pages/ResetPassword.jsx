import React from "react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setNewPassword("");
    setConfirmPassword("");

  

    try {
      const response = await axios.post(
        `https://hr-management-app.onrender.com/api/user/resetpassword/${token}`,
        { newPassword, confirmPassword }
      );

      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="bg-green p-3 rounded w-24">
        <h3>ResetPassword</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="NewPassword" className="form control">
              <strong>New Password</strong>
            </label>
            <input
              type="newPassword"
              name="newPassword"
              className="form-control rounded-0"
              id="newPassword"
              value={newPassword}
              placeholder="Enter your new password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          {
            <div className="mb-3">
              <label htmlFor="password" className="form control">
                <strong>Confirm Password</strong>
              </label>
              <input
                value={confirmPassword}
                type="ConfirmPassword"
                name="ConfirmPassword"
                className="form-control rounded-0"
                id="ConfirmPassword"
                placeholder="Enter your confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          }
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Reset Password
          </button>
        </form>
      </div>
      <br />
      
      <ToastContainer />
    </div>
    
  );
};
export default ResetPassword;

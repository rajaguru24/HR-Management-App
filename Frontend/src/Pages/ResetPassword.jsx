
import React from "react";
import axios from "axios";
import { useState } from "react";
import{Link, useNavigate, useParams} from 'react-router-dom'


const ResetPassword=()=>{
    const[password,setPassword]=useState('')
    const[message,setMessage]=useState('')
    const navigate=useNavigate()
    

const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
        const response=await axios.post(`http://localhost:5000/api/user/resetpassword/${id}/${token}`,{password})    
        console.log(response)
        if(response.data.status===200){
        setMessage(response.data.message)
        }
}catch(error){
    console.log(error)
    setMessage(error.data.message)
    setTimeout("/signin")
}}

return(
    <div className="d-flex justify-content-center align-items-center">
        <div className="bg-green p-3 rounded w-24">
            <h3>
                ResetPassword
            </h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="password" className="form control"><strong>New Password</strong></label>
                    <input type='password' name= 'password' className='form-control rounded-0' id='password' placeholder='Enter your new password' onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="password" className="form control"><strong>Confirm New Password</strong></label>
                    <input type='password2' name= 'password2' className='form-control rounded-0' id='password2' placeholder='Enter your new password' onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                <button type="submit" className="btn btn-success w-100 rounded-0">Reset Password</button>
            </form>

        </div>

    </div>
)}
export default ResetPassword;
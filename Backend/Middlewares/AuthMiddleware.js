// const jwt=require('jsonwebtoken')
// const User=require('../Models/UserModel.js')
// const dotenv=require('env')
// require ('dotenv').config();
// const authMiddleware=async(req,res,next)=>{

// const token =req.header('Authorization')
 
// if(!token){
//     return res.status(401).json({message:"token not found"})
// }
// try{
//      const decode=jwt.verify(token,process.env.JWT_SECRET_KEY)
//      req.user = decode
//      const user = await UserModel.findById(req.user._id)

// if(!user){
//     return res.status(401).json({message:"access denied not a valid user"})
// }   
// next()
// }
// catch(error){
// res.status(500).json({message:"Invalid token internal server error"})
// }} 

// module.exports=authMiddleware
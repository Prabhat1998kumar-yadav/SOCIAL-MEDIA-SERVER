const User = require("../models/User");
const bcrypt=require("bcrypt");
const jwt = require('jsonwebtoken');
const { error, success } = require("../utils/responseWrapper");
const signupController=async(req,res)=>{   
    try{
        const{name,email,password}=req.body;

        // if(!email || !password) return res.status(400).send("All fields are required")
        if(!email || !password){
            return res.send(error(400,"All fields are required"))
        }
        
        const oldUser= await User.findOne({email});
        if(oldUser) return res.send(error(409,"User is already registered."))
        

        const hassedPassword= await bcrypt.hash(password,10);

        const user=await User.create({
            name,
            email,
            password:hassedPassword
        });
        // const newUser=await User.findById(user._id);
       
        // return res.status(201).json({
        //     user,
        // })
        return res.send(success(201,'user created successfully'))
        

    }catch(e){
        // console.log("signup error",error)
        return res.send(error(500,e.message))
    }
}

const loginController=async(req,res)=>{
    try{
        const{email,password}=req.body;

        if(!email || !password)  return res.send(error(400,"All fields are required"))
        
        const user= await User.findOne({email}).select("+password");
        if(!user)  return res.send(error(404,"User in not registered."))

        const matched=await bcrypt.compare(password,user.password);
        if(!matched)  return res.send(error(403,"Incorrect password"))
       
        const accessToken=generateAccessToken({
            _id:user._id,
        });
        const refreshToken=generateRefreshToken({
            _id:user._id,
        });

        res.cookie("jwt",refreshToken,{
            httpOnly:true,
            secure:true
        })
        // res.status(200).json({accessToken})
        res.send(success(200,{accessToken}))
    }catch(e){
        return res.send(error(500,e.message))
    }
}

// this api will check the refreshToken validity and generate a new access token

const refreshAccessTokenController=async(req, res)=>{
    const cookie=req.cookies;
    
    if(!cookie.jwt){
        return res.send(error(401,"Refresh token is required"))
    }
    const refreshToken=cookie.jwt;
    
     try{
        const decoded=jwt.verify(refreshToken,process.env.REFRESH_TOKEN_PRIVATE_KEY);
        const _id=decoded._id;
        const accessToken=generateAccessToken({_id});
        // return res.status(201).json({accessToken})
        return res.send(success(201,{accessToken}))
     }catch(e){
        console.log(e);
        return res.send(error(401,"Invalid refresh token"))
     }
}

const logoutController=async(req,res)=>{
    try{
        res.clearCookie("jwt",{
            httpOnly:true,
            secure:true
        });
        return res.send(success(200," user logged out"))
    }catch(e){
        return res.send(error(500,e.message))
    }
    


}
// internal function

const generateAccessToken=(data)=>{
    
    try{
        
        const token=jwt.sign(data,process.env.ACCESS_TOKEN_PRIVATE_KEY,{
            expiresIn:"1d"
        });
        return token;
    }catch(error){
        console.log(error)
    }
    
}
const generateRefreshToken=(data)=>{
    
    try{
        
        const token=jwt.sign(data,process.env.REFRESH_TOKEN_PRIVATE_KEY,{
            expiresIn:"1y"
        });
        return token;
    }catch(error){
        console.log(error)
    }
    
}

module.exports={
    signupController,
    loginController,
    refreshAccessTokenController,
    logoutController
}
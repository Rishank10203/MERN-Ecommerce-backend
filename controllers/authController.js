import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_SECRET_IN});
};

export const registerUser=asyncHandler(async(req,res)=>{
    const {name,email,password}=req.body;
    const userExists=await User.find({email});
    if(userExists){
        res.status(400);
        throw new Error('User already exists');
    }
    const user = await User.create({name,email,password});
    const token=generateToken(user._id);

    //set HTTP-only cookie
    res.cookie('token',token,{
        httpOnly:true,
        secure: process.env.NODE_ENV==='production',
        sameSite:'lax',
        naxAge:24 * 60 * 60 *1000 //match JWT expiration
    });
    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    });
});

export const loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(user && (await user.matchPassword(password))){
        const token=generateToken(user._id);
        res.cookie('token',token,{
            httpOnly:true,
            secure: process.env.NODE_ENV==='production',
            sameSite:'lax',
            maxAge:24*60*60*1000
        });
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
        });
    }else{
        res.status(401);
        throw new Error('Invalid email or password');
    }
})

export const LogoutUser=asyncHandler(async(req,res)=>{
    res.cookie('token','',{maxAge:0});
    res.json({message:'Logged Out Successfully'});
})
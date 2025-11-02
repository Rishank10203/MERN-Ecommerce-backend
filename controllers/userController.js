import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//Register User

export const registerUser = async (req,res)=>{
    const {name,email,password}=req.body;
    //validation
    if(!name || !email || !password){
        const {name,email,password}=req.body;
        return res.status(400).json({message:"Please fill all the fields"});
    }
    try{
        const existingUser = await User.findOne({email});
        if (existingUser){
            return res.status(400).json({message:"User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password,10);
        const user= await User.create({name,email,password:hashedPassword});

        res.status(201).json({message:"User registered successfully",user});
    }catch(error){
        res.status(500).json({message:error.message});
    }
};


//Login User
export const loginUser = async (req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        
            return res.status(400).json({message:"All fields are required"});
        
    }
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "User not find"});
        }
        const isMatch= await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message: 'Invalid credentials'});
        }
        const token= jwt.sign({id:user_id},process.env.JWT_SECRET,{expiresIn: '1h'});
        res.status(200).json({message: "Login successfull",token});
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

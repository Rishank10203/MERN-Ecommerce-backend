import Product from '../models/Product.js';
import asyncHandler from 'express-async-handler';

export const getProducts=asyncHandler(async(req,res)=>{
    const products =await Product.find({});
    res.json(products);
});

export const getProductById=asyncHandler(async(req,res)=>{
    const product =await Product.findById(req.params.id);
    if(product)res.json(product);
    else{res.status(404);throw new Error('Product not found')}
});

export const createProduct=asyncHandler(async(req,res)=>{
    const {name,price,description,image,countInStock}=req.body;
    const product=new Product({
        name,price,description,image,countInStock
    });
    const created=await product.save();
    res.status(201).json(created);
});

export const updateProduct=asyncHandler(async(req,res)=>{
    const product=await Product.findById(req.params.id);
    if(product){
        Object.assign(product,req.body);
        const updated =await product.save();
        res.json(updated);
    }else{
        res.status(404);
        throw new Error('Product not found');
    }
});

export const deletedProduct=asyncHandler(async(req,res)=>{
    const product=await Product.findById(req.params.id);
    if(product){
        await product.remove();
        res.json({message: 'Product removed'});
    }else{
        res.status(404);
        throw new Error('Product not found');
    }
})
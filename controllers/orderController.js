import asyncHandler from 'express-async-handler';
import Order from "../models/Order.js";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createOrder = asyncHandler(async(req,res)=>{
    const {orderItems, shippingAddress, paymentMehtod, itemsPrice, taxPrice, shippingPrice,totalPrice}=req.body;
    if(!orderItems || orderItems.length===0){
        res.status(400);
        throw new Error('No order items');
    }
    const order=new Order({
        user: req.user._id,
        orderItems,
        shippingAddress,
        paymentMehtod,
        itemsPrice,shippingPrice,taxPrice,totalPrice

    });
    const created= await order.save();
    res.status(201).json(created);
})

export const createPaymentIntent = asyncHandler(async(req,res)=>{
    const {amount,currency='inr'}=req.body;
    const paymentIntent =await stripe.paymentIntents.create({
        amount,
        currency,
    });
    res.json({clientSecret: paymentIntent.client_secret});
});

export const getMyOrders= asyncHandler(async(req,res)=>{
    const orders =await Order.find({user: req.user._id}).populate('orderItems.product','name image price');
    res.json(orders);
})
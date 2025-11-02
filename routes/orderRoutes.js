import express from 'express';
import {protect,admin}from '../middleware/authMiddleware.js';
import { createOrder,createPaymentIntent, getMyOrders } from '../controllers/orderController';
const router=express.Router();

router.post('/',protect,createOrder);
router.post('create-payment-intent',protect,createPaymentIntent);
router.get('/myorders',protect,getMyOrders);

export default router;
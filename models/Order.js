import mongoose from "mongoose";

const orderSchema =new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User",required:true},
    orderItems:[
        {
            product: {type:mongoose.Schema.Types.ObjectId, ref:"Product",required:true},
            name: String,
            qty: Number,
            price: Number,
            image: String
        }
    ],
    shippingAddress:{address: String, city: String, postalCode:String, country:String},
    paymentMethod: String,
    itemsPrice:Number,
    taxPrice: Number,
    shippingPrice:Number,
    totalPrice:Number,
    isPaid:{type:Boolean,dedault:false},
    paidAt:Date,
    isDelivered:{type:Boolean, default:false},
    delivered:Date,
},{timestamps:true});

export default mongoose.model("Order",orderSchema);
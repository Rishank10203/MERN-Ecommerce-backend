import express from 'express';
import { getProducts,getProductById ,createProduct,updateProduct,deletedProduct } from '../controllers/productController';
import { protect,admin } from '../middleware/authMiddleware';
const router=express.Router();

router.route('/').get(getProducts).post(protect,admin,createProduct);
router.route('/:id').get(getProductById).put(protect,admin,updateProduct).delete(protect,admin,deletedProduct);

export default router;
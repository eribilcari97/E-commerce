import express from "express";

import { getAllProducts} from "../controllers/product.controller.js";
import { protectRoute,adminRoute } from "../middleware/auth.middleware.js";
import { getFeaturedProducts,createProduct,deleteProduct,getRecommendedProducts ,getProductsByCategory,toggleFeauturedProduct} from "../controllers/product.controller.js";
const router =express.Router();
router.get("/",protectRoute,adminRoute,getAllProducts);
router.get("/featured",getFeaturedProducts);
router.get("/category/:category",getProductsByCategory);
router.get("/recommendations",getRecommendedProducts);
router.post("/",protectRoute,adminRoute,createProduct);
router.patch("/:id",protectRoute,adminRoute,toggleFeauturedProduct);//patch for updating a couple of feautures
router.delete("/:id",protectRoute,adminRoute,deleteProduct);


export default router;
import express from "express";
import { addToCart } from "../controllers/cartController.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getCartProducts,removeAllFromCart,updateQuantity } from "../controllers/cartController.js";

const router = express();
router.get("/",protectRoute,getCartProducts)
router.post("/",protectRoute, addToCart);

router.delete("/",protectRoute, removeAllFromCart);
router.put("/:id",protectRoute, updateQuantity);



export default router;
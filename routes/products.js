import  express  from "express";
import * as productControler from "../controlers/product.js"
import {  authAdmin } from "../middlwares/auth.js";

const router=express.Router();

router.get("/",productControler.getAllProducts)
router.get("/:id",productControler.getProductId)
router.delete("/:id",authAdmin,productControler.deleteProduct)
router.put("/:id",authAdmin,productControler.updateProduct)
router.post("/",authAdmin,productControler.addProduct)

export default router;
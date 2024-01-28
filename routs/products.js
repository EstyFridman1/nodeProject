import { express } from "express";
import * as productControler from "../controlers/product"

const router=express.Router();

router.get("/",productControler.getAllProducts)
router.get("/:id",productControler.getProductId)
router.delete("/id",productControler.deleteProduct)
router.put("/:id",productControler.updateProduct)
router.post("/",productControler.addProduct)
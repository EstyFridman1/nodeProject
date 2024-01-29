import  express  from "express";
import * as orderControler from "../controlers/order.js"
import { auth, authAdmin } from "../middlwares/auth.js";

const router=express.Router();
router.post("/",auth,orderControler.addOrder)
router.delete("/:id",auth,orderControler.deleteOrder)
router.get("/myOrders",auth,orderControler.getUserUrder)
router.put("/:id",authAdmin,orderControler.setOrderComeOut)
router.get("/",authAdmin,orderControler.getAllOrders)

export default router;

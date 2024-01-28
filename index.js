import { config } from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import productRoute from "./routes/products.js";
import userRoute from "./routes/user.js";
import orderRoute from "./routes/orders.js";
import { connectToDB } from "./config/config.js";
import { errorHandling } from "./middlwares/errorHandling.js";

config();
const app = express();
connectToDB();

app.use(cors())
app.use(morgan("common"))
app.use(express.json())
app.use(express.static('images'))

app.use("/products", productRoute)
app.use("/users", userRoute);
app.use("/orders",orderRoute)
app.use((err, req, res, next) => {
    res.status(500);
    res.send(err.message || " התרחשה תקלה")
})
app.use(errorHandling)
let port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("server is litening on port 5000")
})
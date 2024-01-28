import { config } from "dotenv";
import express from "./express";
import cors from "./cors";
import morgan from "./morgan";


config();
const app=express();

app.use(cors())
app.use(morgan("common"))
app.use(express.json())

let port=process.env.PORT||5000;
app.listen(port, () => {
    console.log("server is litening on port 5000")
})
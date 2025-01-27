require('dotenv').config();

import express from "express";
import cors from "cors";
import {dbConnect} from "./configs/database.config";
import foodRouter from './routers/food.router';
import userRouter from './routers/user.router';
dbConnect();


const app = express();
app.use(express.json());
// app.use(cors({
//     credentials: true,
//     origin: ["http://localhost:4200"]
// }))
app.use(cors({
    credentials: true,
    origin: "http://localhost:4200"  // Use a single string instead of an array if only one origin
}));

 app.use("/api/foods", foodRouter);
 app.use("/api/users", userRouter);
const port = 5000;

app.listen(port, () => {
    console.log("Website served on http://localhost:" + port)
})
require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const { userRouter } = require("./router/user")
const { courseRouter } = require("./router/course")
const { adminRouter } = require("./router/admin")

app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);

async function main(){
    await mongoose.connect(process.env.MONGO_URL);
    console.log("db connected");
    app.listen(3000);
}

main(); 
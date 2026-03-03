const express = require("express");
const mongoose = require("mongoose");
const app = express();
const { userRouter } = require("./router/user")
const { courseRouter } = require("./router/course")
const { purchaseRouter } = require("./router/purchase")
const { adminRouter } = require("./router/admin")

app.use(express.json());

app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/purchase", purchaseRouter);
app.use("/admin", adminRouter);

async function main(){
    await mongoose.connect("mongodb+srv://dhawanlakshya04:xjxuagwF9NSGNGwK@cluster0.h1gr9kw.mongodb.net/")
    console.log("db connected");
    app.listen(3000);
}

main();
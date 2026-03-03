const express = require("express");
const app = express();
const { userRouter } = require("./router/user")
const { courseRouter } = require("./router/course")
const { purchaseRouter } = require("./router/purchase")

app.use(express.json());

app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/purchase", purchaseRouter);

app.listen(3000);

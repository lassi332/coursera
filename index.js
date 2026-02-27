const express = require("express");
const app = express();
const { userRouter } = require("./user")
const { courseRouter } = require("./course")

app.use(express.json());

app.use("/user", userRouter);
app.use("/course", courseRouter);

app.listen(3000);

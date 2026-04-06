const express = require("express");
const courseRouter = express.Router();
const {courseModel, purchaseModel} = require("../db");
const { userMiddleware } =  require("../middleware/user")

courseRouter.post("/purchase", userMiddleware, async (req, res) => {
    const userId = req.userId;
    const courseId = req.body.courseId;

    const purchase = await purchaseModel.create({
        userId,
        courseId
    })

    if (purchase){
        res.json({
            message: "purchase successfull"
        })
    }else {
        res.status(400).json({
            message: "couldn't purchase"
        })
    }
})
courseRouter.get("/all", (req, res) => {
    
})

module.exports = {
    courseRouter : courseRouter
}
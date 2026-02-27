const express = require("express");
//////
const courseRouter = express.Router();

courseRouter.get("/purchase", (req, res) => {
    
})
courseRouter.get("/all", (req, res) => {
    res.json({
        message : "hi there"
    })
})

module.exports = {
    courseRouter : courseRouter
}
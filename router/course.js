const express = require("express");
const courseRouter = express.Router();
const {courseModel} = require("../db");

courseRouter.get("/purchase", (req, res) => {
    
})
courseRouter.get("/all", (req, res) => {
    
})

module.exports = {
    courseRouter : courseRouter
}
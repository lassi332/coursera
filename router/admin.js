const express = require("express");
const adminRouter = express.Router();
const {adminModel, courseModel} = require("../db");
const {z} = require("zod");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const {adminMiddleware} = require("../middleware/admin")

const signupSchema = z.object({
    email: z.email(),
    password: z.string().min(6),
    firstname: z.string().min(1),
    lastname: z.string().min(1)
})
const signinSchema = z.object({
    email: z.email(),
    password: z.string().min(6),
})

adminRouter.post("/signup", async (req, res) => {
    const parsedData = signupSchema.safeParse(req.body);
    if (!parsedData.success){
        return res.status(400).json({
            message: "invalid input"
        })
    }
    const {email, password, firstname, lastname} = parsedData.data;
    const hashedPass = await bcrypt.hash(password, 5);

    const ins = await adminModel.create({
        email,
        password: hashedPass,
        firstname,
        lastname
    });

    if (!ins){
        res.status(400).json({
            message: "couldnt store data on db"
        })
    }
    res.json({
        message: "signup successfull"
    })
    

})

adminRouter.post("/signin", async (req, res) => {
    const parsedData = signinSchema.safeParse(req.body);
    if (!parsedData.success){
        return res.status(400).json({
            message: "invalid creds"
        })
    }

    const {email, password} = parsedData.data;
    const hashedPass = await bcrypt.hash(password, 5);

    const usr = await adminModel.findOne({
        email,
    });

    if (!usr){
        return res.status(400).json({
            message: "no admin found"
        })
    }

    const isPassCorrect = await bcrypt.compare(password, usr.password);
    if (!isPassCorrect){
        return res.status(400).json({
            message: "wrong pass"
        });
    }

    const token = jwt.sign({
        id : usr._id
    }, process.env.ADMIN_JWT_KEY);
    res.json({
        token: token
    })

})

adminRouter.post("/addCourse", adminMiddleware, async (req,res) => {
    const adminId = req.adminId;
    const { title, description, imageURL, price } = req.body;

    const course = await courseModel.create({
        title,
        description,
        price,
        imageURL,
        creatorId: adminId
    })

    if (course){
        res.json({
            message: "course created"
        })
    }else{
        res.status(400).json({
            message: "coudent add course"
        })
    }
})

adminRouter.put("/editCourse", adminMiddleware, async (req, res) => {
    const adminId = req.adminId;
    console.log(adminId);
    const { title, description, imageURL, price, courseId } = req.body;

    const course = await courseModel.updateOne({
        _id: courseId,
        creatorId: adminId
    }, {
        title: title,
        description: description,
        price: price,
        imageURL: imageURL
    })

    console.log(course);
    if (course.matchedCount){
        res.json({
            message : "course updated"
        })
    }else {
        res.status(400).json({
            messaege: "error updating"
        })
    }
})


module.exports = {
    adminRouter : adminRouter
}
const express = require("express");
const userRouter = express.Router();
const {userModel} = require("../db");
const {z} = require("zod");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

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

userRouter.post("/signup", async (req, res) => {
    const parsedData = signupSchema.safeParse(req.body);
    if (!parsedData.success){
        return res.status(400).json({
            message: "invalid input"
        })
    }
    const {email, password, firstname, lastname} = parsedData.data;
    const hashedPass = await bcrypt.hash(password, 5);

    const ins = await userModel.create({
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

userRouter.post("/signin", async (req, res) => {
    const parsedData = signinSchema.safeParse(req.body);
    if (!parsedData.success){
        return res.status(400).json({
            message: "invalid creds"
        })
    }

    const {email, password} = parsedData.data;
    const hashedPass = await bcrypt.hash(password, 5);

    const usr = await userModel.findOne({
        email,
    });

    if (!usr){
        return res.status(400).json({
            message: "no user found"
        })
    }

    const isPassCorrect = await bcrypt.compare(password, usr.password);
    if (!isPassCorrect){
        return res.status(400).json({
            message: "wrong pass"
        });
    }

    const token = jwt.sign({
        id: usr._id
    }, process.env.USER_JWT_KEY);
    res.json({
        token: token
    })

})

module.exports = {
    userRouter : userRouter
}
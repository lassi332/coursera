const jwt = require("jsonwebtoken");

function userMiddleware(req,res,next){
    const token = req.headers.token;
    const decoded = jwt.verify(token, process.env.USER_JWT_KEY);

    if (decoded){
        req.userid = decoded.id;
        next();
    }else {
        res.status(400).json(
            {
                message: "you are not signed in"
            }
        )
    }
}

module.exports = {
    userMiddleware
}

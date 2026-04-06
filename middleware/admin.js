const jwt = require("jsonwebtoken");

function adminMiddleware(req,res,next){
    const token = req.headers.token;
    const decoded = jwt.verify(token, process.env.ADMIN_JWT_KEY);

    if (decoded){
        req.adminId = decoded.id;
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
    adminMiddleware
}

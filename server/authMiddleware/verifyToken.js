const jwt = require("jsonwebtoken")

module.exports = function (req, res, next) {
    const token = req.header("auth-token");

    if(!token) {
        res.status(401).send("Access restricted.")
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("Verified", verified)
        req.user = verified;
        next();
    } catch(err) {
        res.status(400).send("Invalid token")
    }
}


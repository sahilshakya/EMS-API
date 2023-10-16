const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.authUser = decoded
        next();
    } catch (error) {
        return res.json({
            message: "Auth failed"
        })
    }
}
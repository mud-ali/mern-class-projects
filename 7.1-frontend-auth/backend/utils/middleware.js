const logger = require("./logger");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const requestLogger = (req, res, next) => {
    logger.log(`Request Method: ${req.method}`);
    logger.log(`Request URL: ${req.url}`);
    logger.log("Request body:", req.body);
    logger.log("------------");
    next();
};

// middleware for error handling
const errorHandler = (error, req, res, next) => {
    logger.error("error message: ", error.message);
    if (error.name === "CastError") {
        return res.status(400).json({ error: "invalid id" });
    } else if (error.name === "ValidationError") {
        return res.status(400).json({ error: error.message });
    }
    next(error);
};

const tokenExtractor = (req, res, next) => {
    const authHeader = req.get("authorization");
    if (authHeader) {
        req.token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
    }
    next();
}

const getUser = async (req, res, next) => {
    const token = req.token; 
    if (token) {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedToken.id) {
            return res.status(401).json({ error: "Invalid token" });
        }
        req.user = await User.findById(decodedToken.id);
    }
    next();
}

module.exports = { requestLogger, errorHandler, tokenExtractor, getUser };
const bcrypt = require("bcrypt");
const User = require("../models/user");

playlistRouter.post("/users", (req, res, next) => {
    try {
        const { username, password, name } = req.body;

    } catch (error) {
        next(error);
    }
})
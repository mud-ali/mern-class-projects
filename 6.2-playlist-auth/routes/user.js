const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const User = require("../models/user");

userRouter.post("/", async (req, res) => {
    const { username, name, password } = req.body;
    if (!password || password.length < 4) {
        return res
            .status(400)
            .json({ error: "Password required. Minimum 4 characters" });
    }
    const passwordHash = await bcrypt.hash(password, 12);
    try {
        const newUser = new User({
            username,
            name,
            passwordHash,
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

userRouter.get("/", async (req, res) => {
    const { username } = req.body;
    if (!username) {
        const users = await User.find({}).populate("playlists");
        return res.status(200).json(users);
    }

    const user = await User.findOne({ username }).populate("playlists");
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
});

module.exports = userRouter;
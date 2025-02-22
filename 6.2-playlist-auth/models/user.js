const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    passwordHash: String,
    username: String
});

const User = mongoose.model("User", userSchema);

module.exports = User;
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    passwordHash: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        minLength: 2
    },
    playlists: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Playlist",
        },
    ],
});

userSchema.set("toJSON", {
    transform: (_, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        delete ret.passwordHash;
    },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    creator: {
        type: String,
        required: true,
    },
    numOfSongs: Number,
    likes: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

playlistSchema.set("toJSON", {
    transform: (_, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
    },
});

const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = Playlist;
const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
    name: String,
    creator: String,
    numOfSongs: Number,
    likes: Number,
});

const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = Playlist;
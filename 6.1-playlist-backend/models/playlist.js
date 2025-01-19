const mongoose = require("mongoose");
const logger = require("../utils/logger");
const { MONGODB_URI } = require("../utils/config");

const playlistSchema = new mongoose.Schema({
    name: String,
    creator: String,
    numOfSongs: Number,
    likes: Number,
});

mongoose.connect(MONGODB_URI).then(() => {
    logger.log("Connected to Database");
}).catch((e) => {
    logger.error("Error connecting the DB: ", e.message);
});

const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = Playlist;
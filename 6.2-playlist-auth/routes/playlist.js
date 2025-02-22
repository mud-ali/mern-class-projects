const express = require("express");
const playlistRouter = express.Router();
const Playlist = require("../models/playlist");

playlistRouter.get("/", async (req, res, next) => {
    try {
        const playlists = await Playlist.find({});
        res.json(playlists);
    } catch (error) {
        next(error);
    }
});

playlistRouter.post("/", async (req, res, next) => {
    try {
        const playlist = new Playlist(req.body);
        const savedPlaylist = await playlist.save();
        res.status(201).json(savedPlaylist);
    } catch (error) {
        next(error);
    }
});


module.exports = playlistRouter;
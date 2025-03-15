const express = require("express");
const playlistRouter = express.Router();
const Playlist = require("../models/playlist");
const User = require("../models/user");
const logger = require("../utils/logger");

playlistRouter.get("/", async (req, res, next) => {
    try {
        const playlists = await Playlist.find({}).populate("user", {
            username: 1,
            name: 1,
        });
        res.json(playlists);
    } catch (error) {
        next(error);
    }
});

playlistRouter.post("/", async (req, res, next) => {
    try {
        const { name, creator, numOfSongs, likes } = req.body;

        const user = req.user;
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }
        if (!name) {
            return res.status(400).json({ error: "Name is required" });
        } else {
            const playlist = new Playlist({ name, creator, numOfSongs, likes, user: user._id });
            const savedPlaylist = await playlist.save();
            user.playlists = [...user.playlists, savedPlaylist._id];
            await user.save();
            res.status(201).json(savedPlaylist);
        }
    } catch (error) {
        next(error);
    }
});

playlistRouter.delete("/:id", async (req, res, next) => {
    const user = req.user;
    if (!user) return res.status(404).json({ error: "user not found" });

    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) return res.status(404).json({ error: "playlist not found" });

    if (user._id.toString() !== playlist.user.toString()) {
        return res.status(401).json({ error: "Unauthorized Access" });
    } else {
        const removed = await Playlist.findByIdAndDelete(req.params.id);
        user.playlists = user.playlists.filter(
            (pId) => pId.toString() !== req.params.id
        );
        await user.save();
        return res.status(200).json({
            message: `The playlist ${removed.name} was deleted successfully.`,
        });
    }
});

module.exports = playlistRouter;
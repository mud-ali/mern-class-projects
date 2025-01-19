const express = require("express");
const cors = require("cors");
const app = express();
const playlistRouter = require("./routes/playlist");
const { requestLogger, errorHandler } = require("./utils/middleware");

app.use(cors());
app.use(express.json());
app.use("/api/playlists", playlistRouter);
app.use(requestLogger);

app.use(errorHandler);

module.exports = app;
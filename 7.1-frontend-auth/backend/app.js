const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const logger = require("./utils/logger");
const { MONGODB_URI } = require("./utils/config");
const app = express();
const playlistRouter = require("./routes/playlist");
const userRouter = require("./routes/user");
const loginRouter = require("./routes/login");
const { requestLogger, errorHandler, tokenExtractor, getUser } = require("./utils/middleware");

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(tokenExtractor);
app.use(getUser);

app.use("/api/playlists", playlistRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use(errorHandler);

mongoose.connect(MONGODB_URI).then(() => {
    logger.log("Connected to Database");
}).catch((e) => {
    logger.error("Error connecting the DB: ", e.message);
});

module.exports = app;
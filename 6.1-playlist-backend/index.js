const app = require("./app");
const logger = require("./utils/logger");
const { PORT } = require("./utils/config");
const { Playlist } = require("./models/playlist");

app.listen(PORT, () => {
    logger.log(`Server listening on port ${PORT}`);
});
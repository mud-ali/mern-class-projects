const app = require("./app");
const logger = require("./utils/logger");
const { PORT } = require("./utils/config");

app.listen(PORT, () => {
    logger.log(`Server listening on port ${PORT}`);
});
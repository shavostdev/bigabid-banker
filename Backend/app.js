const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const config = require("./src/config");
const cors = require("cors");
const server = require("http").createServer(app);
const campaignRouter = require("./src/api/campaign/campaignController");
const bidsRouter = require("./src/api/bids/bidsController");
const port = config.port || 3001;

require("./src/services/cacheManager");
require("./src/services/socket")(server);

app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());

app.use(campaignRouter);
app.use(bidsRouter);

server.listen(port, () => console.log(`listening on port ${port}!`));

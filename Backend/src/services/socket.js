module.exports = function socket(server) {
  const moment = require("moment");
  const constans = require("../constans");
  const redisClient = require("../services/cacheManager");
  const subscriber = redisClient.duplicate();
  subscriber.subscribe("__keyevent@0__:set");
  const io = require("socket.io")(server, constans.socketOptions);
  io.on("connection", onConnect);
  let selectedCampaign = "";

  function onConnect(socket) {
    console.log("New Client Connected with id: " + socket.id);
    // Join To Room
    socket.on("join", (room) => {
      console.log(`Socket ${socket.id} joining ${room}`);
      socket.join(room);
    });

    subscriber.on("message", async function (channel, key) {
      try {
        if (!selectedCampaign) return;
        const value = await redisClient.getAsync(key);
        const objValue = {
          id: key,
          time: moment().unix(),
          ...JSON.parse(value),
        };
        if (selectedCampaign === objValue?.campaign) {
          socket.emit("sendBids", objValue);
        }
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("selectCampaign", (campaign) => {
      selectedCampaign = campaign;
      socket.emit("sendBids", null);
    });

    socket.on("disconnect", () => {
      selectedCampaign = null;
      console.log("Client Disconnented");
    });
    socket.on("error", () => {
      console.log("Error Happend To Socket");
    });
  }
};

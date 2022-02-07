const constans = require("../../constans");
const redisClient = require("../../services/cacheManager");

class bidsModel {
  static async getAll(req) {
    let keys = await redisClient.zrangeAsync(
      constans.REDIS_KEYS.LIST_OF_BIDS,
      0,
      -1
    );
    let values = [];
    if (keys?.length) values = await redisClient.mgetAsync(...keys);
    const bids = keys
      ?.map((bank, index) => {
        return { id: bank, ...JSON.parse(values[index]) };
      })
      .filter((bid) => bid.campaign === req.body?.campaign);
    return bids;
  }
}

module.exports = bidsModel;

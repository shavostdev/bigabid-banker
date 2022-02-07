const constans = require("../../constans");
const redisClient = require("../../services/cacheManager");

class campaignModel {
  static async getAll() {
    let campaigns = await redisClient.smembersAsync(
      constans.REDIS_KEYS.LIST_OF_CAMPAIGNS
    );
    if (campaigns?.length) {
      campaigns = campaigns.map((camp) => {
        return { label: camp, value: camp };
      });
    }
    return campaigns;
  }
}

module.exports = campaignModel;

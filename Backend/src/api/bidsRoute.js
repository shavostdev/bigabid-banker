const express = require("express");
const router = new express.Router();
const constans = require("../constans");

// Load All bids
router.post("/api/getAllBids", async (req, res) => {
  try {
    global.selectedCampaign = req.body?.campaign;
    let keys = await cache.zrangeAsync(constans.REDIS_KEYS.LIST_OF_BIDS, 0, -1);
    let values = [];
    if (keys?.length) values = await cache.mgetAsync(...keys);
    const bids = keys
      ?.map((bank, index) => {
        return { id: bank, ...JSON.parse(values[index]) };
      })
      .filter((bid) => bid.campaign === req.body?.campaign);
    res.status(200).send({ status: "OK", data: bids });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;

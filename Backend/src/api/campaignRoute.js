const express = require("express");
const router = new express.Router();
const constans = require("../constans");

// Load Campaigns
router.get("/api/getCampaigns", async (req, res) => {
  let data = await cache.smembersAsync(constans.REDIS_KEYS.LIST_OF_CAMPAIGNS);
  if (data?.length) {
    data = data.map((camp) => {
      return { label: camp, value: camp };
    });
  }
  try {
    res.status(200).send({ status: "OK", data });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;

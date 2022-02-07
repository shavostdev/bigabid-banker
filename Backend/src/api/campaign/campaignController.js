const express = require("express");
const router = new express.Router();
const campaignModel = require("./campaignModel");

router.get("/api/getCampaigns", async (req, res) => {
  try {
    const campaigns = await campaignModel.getAll();
    res.status(200).send({ status: "OK", data: campaigns });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;

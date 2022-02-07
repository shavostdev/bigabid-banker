const express = require("express");
const router = new express.Router();
const bidsModel = require("./bidsModel");

router.post("/api/getAllBids", async (req, res) => {
  try {
    const bids = await bidsModel.getAll(req);
    res.status(200).send({ status: "OK", data: bids });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;

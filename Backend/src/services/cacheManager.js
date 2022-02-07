"use strict";

const redis = require("redis");
const { promisify } = require("util");
const config = require("../config");
const redisClient = redis.createClient(config.redis_port);

const password = config.redis_password || null;
if (password && password != "null") {
  redisClient.auth(password, (err, res) => {
    console.log("res", res);
    console.log("err", err);
  });
}

try {
  redisClient.getAsync = promisify(redisClient.get).bind(redisClient);
  redisClient.setAsync = promisify(redisClient.set).bind(redisClient);
  redisClient.smembersAsync = promisify(redisClient.smembers).bind(redisClient);
  redisClient.zrangeAsync = promisify(redisClient.zrange).bind(redisClient);
  redisClient.mgetAsync = promisify(redisClient.mget).bind(redisClient);
  redisClient.zcardAsync = promisify(redisClient.zcard).bind(redisClient);
} catch (e) {
  console.log("redis error", e);
}

redisClient.on("connect", function () {
  console.log("Redis is connected");
});
redisClient.on("error", function (err) {
  console.log("Redis error.", err);
});

setInterval(function () {
  console.log("Keeping alive Redis");
  redisClient.set("ping", "pong");
}, 1000 * 60 * 4);

module.exports = redisClient;

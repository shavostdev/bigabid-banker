module.exports = {
  REDIS_KEYS: {
    LIST_OF_BIDS: "LIST_OF_BIDS",
    LIST_OF_CAMPAIGNS: "LIST_OF_CAMPAIGNS",
  },
  socketOptions: {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
    reconnection: true,
    reconnectionDelay: 500,
    reconnectionAttempts: "Infinity",
  },
};

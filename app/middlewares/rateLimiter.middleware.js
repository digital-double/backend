/** 
// rateLimiter.js
const redis = require("redis");
const rateLimit = require("express-rate-limit");
const RedisStore = require("rate-limit-redis");

// Create Redis client
const redisClient = redis.createClient();

const limiter = rateLimit({
  store: new RedisStore({
    client: redisClient,
    prefix: "rateLimiter:",
  }),
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests, please try again later.",
});

module.exports = limiter;

*/
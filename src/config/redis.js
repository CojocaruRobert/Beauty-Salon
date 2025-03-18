const redis = require('redis');
const config = require('./index');

let redisClient;

const setupRedis = async () => {
  try {
    redisClient = redis.createClient({
      url: `redis://${config.redis.host}:${config.redis.port}`
    });

    redisClient.on('error', (err) => {
      console.error('Redis Error:', err);
    });

    redisClient.on('connect', () => {
      console.log('Connected to Redis');
    });

    await redisClient.connect();
    return redisClient;
  } catch (err) {
    console.warn('Redis connection failed, using fallback implementation:', err.message);
    // Create a simple in-memory cache as fallback
    const cache = new Map();
    return {
      get: async (key) => {
        console.log(`[Redis Fallback] Getting ${key}`);
        return cache.get(key);
      },
      set: async (key, value, options) => {
        console.log(`[Redis Fallback] Setting ${key}`);
        cache.set(key, value);
        // If TTL is provided, set up auto-expiration
        if (options && options.EX) {
          setTimeout(() => cache.delete(key), options.EX * 1000);
        }
        return 'OK';
      },
      del: async (key) => {
        console.log(`[Redis Fallback] Deleting ${key}`);
        return cache.delete(key) ? 1 : 0;
      },
      isReady: false,
      fallbackMode: true
    };
  }
};

module.exports = setupRedis();
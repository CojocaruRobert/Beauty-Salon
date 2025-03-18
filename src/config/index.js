require('dotenv').config({
    path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
  });
  
  const config = {
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '3001'),
    
    // Database
    database: {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      name: process.env.DB_NAME || 'beautyapp',
      user: process.env.DB_USER || 'beautyapp',
      password: process.env.DB_PASSWORD || 'mysecretpassword',
      dialect: 'postgres'
    },
    
    // Redis
    redis: {
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
    },
    
    // JWT
    jwt: {
      secret: process.env.JWT_SECRET || 'dev-secret',
      expiresIn: process.env.JWT_EXPIRES_IN || '24h'
    }
  };
  
  module.exports = config;
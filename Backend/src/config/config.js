// Environment variables
const config = {
  PORT: process.env.PORT || 3000,
  HOST: process.env.HOST || 'localhost',
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Database
  DB: {
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    HOST: process.env.DB_HOST,
    PORT: process.env.DB_PORT,
    NAME: process.env.DB_NAME,
  },
  
  // JWT
  JWT: {
    SECRET: process.env.JWT_SECRET,
    EXPIRY: process.env.JWT_EXPIRY || '7d',
  },
  
  // CORS
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
  
  // Cloudinary
  CLOUDINARY: {
    NAME: process.env.CLOUDINARY_NAME,
    API_KEY: process.env.CLOUDINARY_API_KEY,
    API_SECRET: process.env.CLOUDINARY_API_SECRET,
  },
};

module.exports = config;

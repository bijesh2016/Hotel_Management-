require('dotenv').config();
const app = require('./src/config/express.config');
const pool = require('./src/config/database.config');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

// Test database connection
pool.connect()
  .then(() => {
    console.log('✅ Database connection established');
    console.log(`📊 Database: ${process.env.DB_NAME} on ${process.env.DB_HOST}:${process.env.DB_PORT}`);
    
    // Start server only after database connection is confirmed
    app.listen(PORT, HOST, () => {
      console.log(`\n🚀 Server is running on http://${HOST}:${PORT}`);
      console.log(`📚 API Documentation: http://${HOST}:${PORT}/api-docs`);
      console.log(`🧪 Test Auth: http://${HOST}:${PORT}/api/auth`);
      console.log(`💻 Frontend: http://localhost:5173\n`);
    });
  })
  .catch((err) => {
    console.error('❌ Database connection failed:', err.message);
    console.error('Please ensure:');
    console.error('  1. PostgreSQL is running');
    console.error('  2. Database "hotel_reservation" exists');
    console.error('  3. .env file has correct DB credentials');
    process.exit(1);
  });

// Handle unhandled rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err);
  process.exit(1);
});

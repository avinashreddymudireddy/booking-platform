require('dotenv').config({ path: '../../../.env' });

module.exports = {
  development: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'booking_platform',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres'
  }
};

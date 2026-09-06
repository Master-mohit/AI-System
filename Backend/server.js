const dns = require('dns');

dns.setServers(['8.8.8.8', '1.1.1.1']);

require('dotenv').config();

const app = require('./src/app');
const connectDB = require('./src/config/db');

connectDB()
  .then(() => {
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((err) => {
    console.error('Database connection failed. Server not started.');
  });
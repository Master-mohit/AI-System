require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db');


connectDB().then(() => {
    console.log('Connected to MongoDB');
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


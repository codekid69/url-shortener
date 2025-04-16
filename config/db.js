const mongoose = require('mongoose');
require('dotenv').config();
async function connectToDb() {
    try {
        const instanceTimeout = setTimeout(() => {
            console.error('Database connection timed out.');
            process.exit(1);
        }, 10000);
        await mongoose.connect(process.env.MONGO_URL);
        clearTimeout(instanceTimeout);
    } catch (error) {
        throw error;
    }
}
module.exports = connectToDb;
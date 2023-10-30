const dotenv = require('dotenv').config;
const mongoose = require("mongoose");
const connectDb = async () => {
    try {
        const connect = await mongoose.connect('mongodb://127.0.0.1:27017/fitness', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database Connected: ",connect.connection.host,connect.connection.name);
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
}
module.exports = connectDb;
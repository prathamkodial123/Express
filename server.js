const express = require('express')
const errorHandler = require('./middleware/errorhandler');
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const API_URL_USER = require('./constants/apiConstant')
const cors = require('cors');
connectDb();
const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
    origin: 'http://localhost:3000', // Replace with the origin of your React frontend
    optionsSuccessStatus: 200, // Some legacy browsers (IE11) choke on a 204 response
};
app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/contacts', require("./routes/contactRoutes"));
app.use('/api/users', require("./routes/userRoutes"));
app.use('/api/training-class', require("./routes/trainingClassRoutes"));
app.use('/api/cart', require("./routes/cartRoutes"));
app.use('/api/subscription', require("./routes/subscriptionRoutes"));
app.use('/api/calories', require("./routes/goalRoutes"));
app.use(errorHandler);
app.listen(port, () => {
    console.log(`Server running on the port ${port}`);
})

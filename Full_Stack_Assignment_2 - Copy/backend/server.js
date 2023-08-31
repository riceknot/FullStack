const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = 3000;

app.use(cors({
    origin: 'http://localhost:3001' // Replace with your React development server's URL
}));

app.use(express.json());

const productRouter = require('./routes/product');
const RegisterLoginRouter = require('./routes/login-register');

app.use('/', RegisterLoginRouter);
app.use('/product', productRouter);


const url = 'mongodb+srv://khaiminh2001:minh123@bing-chilling.nrj7j40.mongodb.net/USERS?retryWrites=true&w=majority';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        // const connection = mongoose.connection;

        // connection.once('open', () => {
        // console.log("MongoDB Database connection established successfully");
        // });
        app.listen(port, () => console.log("Server up and running!"))
    })
    .catch((error) => console.log(error.message))



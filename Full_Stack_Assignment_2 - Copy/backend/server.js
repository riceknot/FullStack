const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

const sellerRouter = require('./routes/seller');
const customerRouter = require('./routes/customer');
const productRouter = require('./routes/product');

app.use('/seller', sellerRouter);
app.use('/customer', customerRouter);
app.use('/product', productRouter);


const url = process.env.ATLAS_URI;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    // const connection = mongoose.connection;

    // connection.once('open', () => {
    // console.log("MongoDB Database connection established successfully");
    // });
    app.listen(port, () => console.log("Server up and running!"))})
.catch((error) => console.log(error.message) )



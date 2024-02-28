const express = require('express');
const app = express();
const router = require('./src/routes/route');
const { default: mongoose } = require('mongoose');
require('dotenv').config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

mongoose.connect('mongodb://localhost:27017/express_mongo')
    .then(() => { console.log('mongo connected') })
    .catch(err => console.error('MongoDB connection error:', err))

app.listen(process.env.PORT, () => {
    console.log(`Server is runnig on ${process.env.PORT}`)
}) 

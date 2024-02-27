const express = require('express');
const app = express();
const postController = require('./src/controllers/LoginController')
require('dotenv').config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', postController);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(process.env.PORT, () => {
    console.log(`Server is runnig on ${process.env.PORT}`)
}) 

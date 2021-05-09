require('dotenv').config();
const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true } ));

app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'hello world'
    });
});

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server start at port ${process.env.SERVER_PORT} `);
});
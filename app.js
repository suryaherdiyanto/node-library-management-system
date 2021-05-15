require('dotenv').config();
const express = require('express');
const apiRoutes = require('./routes/api');
const sequelize = require('./app/models/index');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true } ));

app.use('/api', apiRoutes);

app.all('*', (_, res) => {
    res.status(404).json({
        status: 'not found',
        message: 'Url that you looking for cloun\'t be found!'
    });
});

sequelize.authenticate().then(() => {
    console.log('Database connected successfully!');

    app.listen(process.env.SERVER_PORT, () => {
        console.log(`Server start at port ${process.env.SERVER_PORT} `);
    });
}).catch((e) => {
    console.error(`Couln\'t connect to database ${e}`);
});


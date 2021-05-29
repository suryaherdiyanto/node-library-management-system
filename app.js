require('dotenv').config();
const express = require('express');
const apiRoutes = require('./routes/api');

const authorRoutes = require('./routes/author');
const publisherRoutes = require('./routes/publisher');
const { sequelize } = require('./app/models/index');

const { validation } = require('@kodinggen/express-validator');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true } ));

// Validation init
app.use(validation());

app.use('/api', apiRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/publishers', publisherRoutes);

app.all('*', (_, res) => {
    res.status(404).json({
        status: 'not found',
        message: 'Url that you looking for cloun\'t be found!'
    });
});

app.locals.baseUrl = function() {
    return `${process.env.APP_URL}`;
}

app.locals.handleError = function(res, exception) {

    if (exception.name === 'SequelizeValidationError') {
        const errors = {};
        exception.errors.forEach(e => {
            if (!errors[e.path]) {
                errors[e.path] = [e.message];
            } else {
                errors[e.path].push(e.message);
            }
        });

        res.status(422).json({
            status: 'validation errors',
            statusCode: 422,
            errors: errors
        });
    } else {
        res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: exception.message
        });
    }
}

sequelize.authenticate().then(() => {
    console.log('Database connected successfully!');

    app.listen(process.env.SERVER_PORT, () => {
        console.log(`Server start at port ${process.env.SERVER_PORT} `);
    });
}).catch((e) => {
    console.error(`Couln\'t connect to database ${e}`);
});


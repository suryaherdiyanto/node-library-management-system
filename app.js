require('dotenv').config();
const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');

const authorRoutes = require('./routes/author');
const publisherRoutes = require('./routes/publisher');
const bookRoutes = require('./routes/book');
const bookCategoryRoutes = require('./routes/bookcategories');
const { sequelize } = require('./app/models/index');

const { validation } = require('@kodinggen/express-validator');

const app = express();
const corsOptions = {
    origin: ['http://localhost', 'https://librarymanagement.kodinggen.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    preflightContinue: false
};

app.use(express.json());
app.use(express.urlencoded({ extended: true } ));
app.use(cors(corsOptions));

// Validation init
app.use(validation());

app.use('/api', apiRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/publishers', publisherRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/book-categories', bookCategoryRoutes);

app.all('*', (_, res) => {
    res.status(404).json({
        status: 'not found',
        message: 'Url that you looking for cloudn\'t be found!',
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
            errors: errors,
            stack: process.env.NODE_ENV !== 'production' ? exception.stack:''
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


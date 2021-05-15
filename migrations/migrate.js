require('dotenv').config();
const sequelize = require('../app/models/index');

sequelize.authenticate().then(() => {
    console.log('Database successfully connected!');
    sequelize.sync({ alter: true, force: (process.argv && process.argv[2] === 'force') ? true:false }).then(() => {
        console.log('Tables created successfully');
        process.exit(0);
    });
}).catch((e) => {
    console.error(`Couln\'t connect to database ${e}`);
});
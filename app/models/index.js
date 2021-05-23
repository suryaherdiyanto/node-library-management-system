const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: (process.env.APP_ENV === 'local') ? console.log:false,
    timezone: "+08:00"
});

let db = {};

const models = fs.readdirSync(__dirname).filter((item) => {
    return item !== 'index.js';
});
models.forEach((modelFile) => {
    const model = require(`${__dirname}/${modelFile}`);
    const Model = model(sequelize, DataTypes);

    db[Model.name] = Model;
});

module.exports = { sequelize, db };
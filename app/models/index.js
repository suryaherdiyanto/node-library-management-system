const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
});

const models = fs.readdirSync(__dirname).filter((item) => {
    return item !== 'index.js';
});
models.forEach((modelFile) => {
    const model = require(`${__dirname}/${modelFile}`);
    model(sequelize, DataTypes);
});

module.exports = sequelize;
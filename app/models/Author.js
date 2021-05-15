module.exports = function (sequelize, DataTypes) {
    const Author = sequelize.define('Authors', {
        title: {
            type: DataTypes.ENUM('Mr', 'Mrs'),
            defaultValue: 'Mr'
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        dob: {
            type: DataTypes.DATE,
            allowNull: false
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    });

    return Author;
}
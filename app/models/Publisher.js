module.exports = function (sequelize, DataTypes) {
    const Publisher = sequelize.define('Publisher', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phoneNumber: {
            type: DataTypes.STRING(15),
            allowNull: false
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    });

    return Publisher;
}
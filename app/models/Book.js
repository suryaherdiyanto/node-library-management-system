const { Deferrable } = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    const Book = sequelize.define('Book', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        edition: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        numberOfPages: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        publishDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        coverImage: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        publisherId: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            references: {
                model: 'Publishers',
                deferrable: Deferrable.INITIALLY_DEFERRED
            }
        },
        authorId: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            references: {
                model: 'Authors',
                deferrable: Deferrable.INITIALLY_DEFERRED
            }
        }
    });

    return Book;
}
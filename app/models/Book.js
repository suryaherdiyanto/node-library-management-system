const { Deferrable } = require('sequelize');

module.exports = function (sequelize, DataTypes, Model) {
    
    class Book extends Model {}

    Book.init({
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
        availableCount: {
            type: DataTypes.INTEGER,
            default: 0,
            allowNull: false
        },
        rentPrice: {
            type: DataTypes.FLOAT,
            default: 0.00,
            allowNull: false
        },
        categoryId: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            references: {
                model: 'BookCategories',
                deferrable: Deferrable.INITIALLY_DEFERRED
            }
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
    }, { sequelize, modelName: 'Book' });

    Book.paginate = async function(query = {}, page = 1, perpage = 10) {
        query.offset = ((page-1) * perpage);
        query.limit = perpage;

        const data = await this.findAll(query);

        const total = await this.count();
        const totalPage = Math.ceil(total / perpage);

        return {
            data: data,
            pagination: {
                perpage: perpage,
                current_page: page,
                max_page: totalPage,
                total_shown: data.length,
                total: total
            }
        }
    }

    return Book;
}
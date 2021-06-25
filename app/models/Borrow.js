const { Deferrable } = require('sequelize');

module.exports = function(sequelize, DataTypes, Model) {

    class Borrow extends Model {};

    Borrow.init({
        bookId: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            references: {
                model: 'Books',
                defferable: Deferrable.INITIALLY_DEFERRED
            }
        },
        email: {
            type: DataTypes.STRING(50),
            unique: true,
        },
        firstName: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        dueDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        totalPenalty: {
            type: DataTypes.FLOAT,
            defaultValue: 0.00
        },
        status: {
            type: DataTypes.ENUM('in_progress', 'cancel', 'return', 'return_with_delay'),
            defaultValue: 'in_progress'
        }
    }, { sequelize, modelName: 'Borrow' } );

    Borrow.paginate = async function(query = {}, page = 1, perpage = 10) {
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

    return Borrow;

}
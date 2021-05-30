module.exports = function (sequelize, DataTypes, Model) {

    class Publisher extends Model {}

    Publisher.init({
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
    }, { sequelize, modelName: 'Publisher' } );

    Publisher.paginate = async function(query = {}, page = 1, perpage = 10) {
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

    return Publisher;
}
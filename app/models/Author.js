module.exports = function (sequelize, DataTypes, Model) {
    
    class Author extends Model {}

    Author.init({
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
    }, { sequelize, modelName: 'Author' });

    Author.paginate = async function(query = {}, page = 1, perpage = 10) {

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

    return Author;
}
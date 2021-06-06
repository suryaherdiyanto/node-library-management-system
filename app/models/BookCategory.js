module.exports = function(sequelize, DataTypes, Model) {
    class BookCategory extends Model {}

    BookCategory.init({
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, { sequelize, modelName: 'BookCategory' });

    BookCategory.paginate = async function(query = {}, page = 1, perpage = 10) {
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

    return BookCategory;
}
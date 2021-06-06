const { BookCategory } = require('../models/index').db;

module.exports = {
    index: async function(req, res) {

        try {
            const { page, perpage } = req.query;
            
            const books = await BookCategory.paginate(undefined, parseInt(page) || 1, parseInt(perpage) || 10);
    
            res.status(200).json({
                status: 'success',
                books
            });
        } catch(e) {
            req.app.locals.handleError(res, e);
        }
    },

    create: async function(req, res) {

        try {
            const { name, description } = req.body;
            const validator = req.validator.build({ name }, {
                name: 'required|string',
            });
            const validationResult = await validator.validate();

            if (validationResult.status === 'error') {
                return res.status(422).json(validationResult.data);
            }

            const book = await BookCategory.create({ name, description });
    
            res.status(200).json({
                status: 'success',
                message: 'A new Book Category has been created!',
                BookCategory: book
            });
        } catch(e) {
            req.app.locals.handleError(res, e);
        }
        
    },

    edit: async function(req, res) {
        try {
            
            const book = await BookCategory.findByPk(req.params.id);
    
            if (!book) {
                res.status(404).json({
                    status: 'not found',
                    message: 'Book Category that you looking for couldn\'t be found'
                });
            }
    
            res.status(200).json({
                status: 'found',
                data: book
            });
        } catch(e) {
            req.app.locals.handleError(res, e);
        }
    },

    update: async function(req, res) {
        try {
            const { name, description } = req.body;

            const validator = req.validator.build({ name, description }, {
                name: 'required|string'
            });

            const validationResult = await validator.validate();

            if (validationResult.status === 'error') {
                return res.status(422).json(validationResult.data);
            }

            await BookCategory.update({ name, description }, { where: { id: req.params.id } } );

            res.status(200).json({
                status: 'success',
                message: 'The Book Category has been saved!'
            });
        } catch(e) {
            req.app.locals.handleError(res, e);
        }
    },

    destroy: async function(req, res) {
        try {

            await BookCategory.destroy( { where: { id: req.params.id } } );

            res.status(200).json({
                status: 'success',
                message: 'The Book Category has been deleted!'
            });
        } catch(e) {
            req.app.locals.handleError(res, e);
        }
    }
}
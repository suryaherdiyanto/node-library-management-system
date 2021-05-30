const { Book } = require('../models/index').db;

module.exports = {
    index: async function(req, res) {

        try {
            const { page, perpage } = req.query;
            
            const books = await Book.paginate(undefined, parseInt(page) || 1, parseInt(perpage) || 10);
    
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
            const { title, edition, numberOfPages, publishDate, coverImage, publisherId, authorId } = req.body;
            const validator = req.validator.build({ title, edition, numberOfPages, publishDate, coverImage, publisherId, authorId }, {
                title: 'required|string',
                edition: 'required|integer|min:1',
                numberOfPages: 'required|integer|min:30',
                coverImage: 'optional|string',
                publisherId: 'required|integer|min:0',
                authorId: 'required|integer|min:0'
            });
            const validationResult = await validator.validate();

            if (validationResult.status === 'error') {
                return res.status(422).json(validationResult.data);
            }

            const book = await Book.create({ title, edition, numberOfPages, publishDate, coverImage, publisherId, authorId });
    
            res.status(200).json({
                status: 'success',
                message: 'A new Book has been created!',
                Book: book
            });
        } catch(e) {
            req.app.locals.handleError(res, e);
        }
        
    },

    edit: async function(req, res) {
        try {
            
            const book = await Book.findByPk(req.params.id, { include: ['Author','Publisher'] });
    
            if (!book) {
                res.status(404).json({
                    status: 'not found',
                    message: 'Book that you looking for couldn\'t be found'
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
            const { title, edition, numberOfPages, publishDate, coverImage, publisherId, authorId } = req.body;

            const validator = req.validator.build({ title, edition, numberOfPages, publishDate, coverImage, publisherId, authorId }, {
                title: 'required|string',
                edition: 'required|integer|min:1',
                numberOfPages: 'required|integer|min:30',
                coverImage: 'optional|string',
                publisherId: 'required|integer|min:0',
                authorId: 'required|integer|min:0'
            });

            const validationResult = await validator.validate();

            if (validationResult.status === 'error') {
                return res.status(422).json(validationResult.data);
            }

            await Book.update({ title, edition, numberOfPages, publishDate, coverImage, publisherId, authorId }, { where: { id: req.params.id } } );

            res.status(200).json({
                status: 'success',
                message: 'The Book has been saved!'
            });
        } catch(e) {
            req.app.locals.handleError(res, e);
        }
    },

    destroy: async function(req, res) {
        try {

            await Book.destroy( { where: { id: req.params.id } } );

            res.status(200).json({
                status: 'success',
                message: 'The Book has been deleted!'
            });
        } catch(e) {
            req.app.locals.handleError(res, e);
        }
    }
}
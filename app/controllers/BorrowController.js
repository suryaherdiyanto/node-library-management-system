const { Borrow } = require('../models/index').db;


module.exports = {

    index: async function(req, res) {

        try {
            const { page, perpage } = req.query;
            
            const borrows = await Borrow.paginate(undefined, parseInt(page) || 1, parseInt(perpage) || 10);
    
            res.status(200).json({
                status: 'success',
                borrows
            });
        } catch(e) {
            req.app.locals.handleError(res, e);
        }
    },

    create: async function(req, res) {

        try {
            const { bookId, email, firstName, lastName, address, date, dueDate } = req.body;
            const validator = req.validator.build({ bookId, email, firstName, lastName, address, date, dueDate }, {
                bookId: 'required|integer',
                email: 'required|string|email',
                firstName: 'required|string',
                lastName: 'optional|string',
                address: 'required|string',
                date: 'required',
                dueDate: 'required'
            });
            const validationResult = await validator.validate();

            if (validationResult.status === 'error') {
                return res.status(422).json(validationResult.data);
            }

            const book = await Borrow.create({ bookId, email, firstName, lastName, address, date, dueDate });
    
            res.status(200).json({
                status: 'success',
                message: 'A new transaction has been created!',
                Borrow: book
            });
        } catch(e) {
            req.app.locals.handleError(res, e);
        }
        
    },

    edit: async function(req, res) {
        try {
            
            const book = await Borrow.findByPk(req.params.id, { include: ['Book'] });
    
            if (!book) {
                return res.status(404).json({
                    status: 'not found',
                    message: 'Transaction that you looking for couldn\'t be found'
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

    destroy: async function(req, res) {
        try {

            await Borrow.destroy( { where: { id: req.params.id } } );

            res.status(200).json({
                status: 'success',
                message: 'The transaction has been deleted!'
            });
        } catch(e) {
            req.app.locals.handleError(res, e);
        }
    }

}
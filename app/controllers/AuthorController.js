const { Author } = require('../models/index').db;

module.exports = {

    index: async function(req, res) {

        try {
            const { page, perpage } = req.query;

            const authors = await Author.paginate(undefined, parseInt(page) || 1, parseInt(perpage) || 10);
    
            res.status(200).json({
                status: 'success',
                authors
            });
        } catch(e) {
            req.app.locals.handleError(res, e);
        }
    },

    create: async function(req, res) {
        
        
        try {
            const { title, firstName, lastName, dob, address } = req.body;
            const validator = req.validator.build({ title, firstName, lastName, dob, address }, {
                title: 'required|enum:Mr,Mrs',
                firstName: 'required|string',
                lastName: 'required|string',
                dob: 'required',
                address: 'required'
            });
            const validationResult = await validator.validate();
    
            if (validationResult.status === 'error') {
                return res.status(422).json(validationResult.data);
            }

            const author = await Author.create({
                title,
                firstName,
                lastName,
                dob,
                address
            });
    
            res.status(200).json({
                status: 'success',
                message: 'A new author has been created!',
                author: author
            });
        } catch(e) {
            req.app.locals.handleError(res, e);
        }
        
    },

    edit: async function(req, res) {
        try {
            
            const author = await Author.findByPk(req.params.id);

            author.test();
    
            if (!author) {
                res.status(404).json({
                    status: 'not found',
                    message: 'Author that you looking for couldn\'t be found'
                });
            }
    
            res.status(200).json({
                status: 'found',
                data: author
            });
        } catch(e) {
            req.app.locals.handleError(res, e);
        }
    },

    update: async function(req, res) {
        try {
            const { title, firstName, lastName, dob, address } = req.body;
            const validator = req.validator.build({ title, firstName, lastName, dob, address }, {
                title: 'required|enum:Mr,Mrs',
                firstName: 'required|string',
                lastName: 'required|string',
                dob: 'required',
                address: 'required'
            });
            const validationResult = await validator.validate();
    
            if (validationResult.status === 'error') {
                return res.status(422).json(validationResult.data);
            }

            await Author.update({
                title,
                firstName,
                lastName,
                dob,
                address
            }, { where: { id: req.params.id } } );

            res.status(200).json({
                status: 'success',
                message: 'The author has been saved!'
            });
        } catch(e) {
            req.app.locals.handleError(res, e);
        }
    },

    destroy: async function(req, res) {
        try {

            await Author.destroy( { where: { id: req.params.id } } );

            res.status(200).json({
                status: 'success',
                message: 'The author has been deleted!'
            });
        } catch(e) {
            req.app.locals.handleError(res, e);
        }
    }

}
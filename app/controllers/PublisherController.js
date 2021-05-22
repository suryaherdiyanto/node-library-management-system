const { Publisher } = require('../models/index').db;

module.exports = {

    index: async function(req, res) {

        try {
            const publishers = await Publisher.findAll();
    
            res.status(200).json({
                status: 'success',
                data: publishers
            });
        } catch(e) {
            req.app.locals.handleError(res, e);
        }
    },

    create: async function(req, res) {
        const { name, phoneNumber, address } = req.body;

        try {
            const publisher = await Publisher.create({ name, phoneNumber, address });
    
            res.status(200).json({
                status: 'success',
                message: 'A new Publisher has been created!',
                Publisher: publisher
            });
        } catch(e) {
            req.app.locals.handleError(res, e);
        }
        
    },

    edit: async function(req, res) {
        try {
            
            const publisher = await Publisher.findByPk(req.params.id);
    
            if (!publisher) {
                res.status(404).json({
                    status: 'not found',
                    message: 'Publisher that you looking for couldn\'t be found'
                });
            }
    
            res.status(200).json({
                status: 'found',
                data: publisher
            });
        } catch(e) {
            req.app.locals.handleError(res, e);
        }
    },

    update: async function(req, res) {
        try {
            const { name, phoneNumber, address } = req.body;

            await Publisher.update({ name, phoneNumber, address }, { where: { id: req.params.id } } );

            res.status(200).json({
                status: 'success',
                message: 'The Publisher has been saved!'
            });
        } catch(e) {
            req.app.locals.handleError(res, e);
        }
    },

    destroy: async function(req, res) {
        try {

            await Publisher.destroy( { where: { id: req.params.id } } );

            res.status(200).json({
                status: 'success',
                message: 'The Publisher has been deleted!'
            });
        } catch(e) {
            req.app.locals.handleError(res, e);
        }
    }

}
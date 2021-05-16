const { Authors } = require('../models/index').models;

module.exports = {

    index: async function(req, res) {
        const authors = await Authors.findAll();

        res.status(200).json({
            status: 'success',
            data: authors
        });
    },

    create: async function(req, res) {
        const { title, firstName, lastName, dob, address } = req.body;
        const author = await Authors.create({
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
    },

    edit: async function(req, res) {
        try {
            
            const author = await Authors.findByPk(req.params.id);
    
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
            res.status(500).json({
                status: 'error',
                message: e.message
            });
        }
    },

    update: async function(req, res) {
        try {
            const { title, firstName, lastName, dob, address } = req.body;

            await Authors.update({
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
            res.status(500).json({
                status: 'error',
                message: e.message
            });
        }
    },

    destroy: async function(req, res) {
        try {

            await Authors.destroy( { where: { id: req.params.id } } );

            res.status(200).json({
                status: 'success',
                message: 'The author has been deleted!'
            });
        } catch(e) {
            res.status(500).json({
                status: 'error',
                message: e.message
            });
        }
    }

}
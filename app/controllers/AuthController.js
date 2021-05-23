const { User } = require('../models/index').db;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {

    register: async (req, res) => {
        try {
            const { email, firstName, lastName, password } = req.body;
            const validator = req.validator.build({ email, firstName, lastName, password },{
                email: 'required|string|email',
                firstName: 'required|string',
                lastName: 'required|string',
                password: 'required|min:6'
            });
            const validationResult = await validator.validate();

            if (validationResult.status === 'error') {
                return res.status(422).json(validationResult.data);
            }

            let passwordHash = '';
            bcrypt.hash(password, 10, function(err, hash) {
                if (err) {
                    console.log(err);
                }

                passwordHash = hash;
                User.create({ email, firstName, lastName, password: passwordHash });

                res.status(200).json({
                    status: 'success',
                    message: 'Register successfully!'
                });
            });

        } catch (e) {
            req.app.locals.handleError(res, e);
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({
                where: { email: email }
            });

            if (!user) {
                return res.status(400).json({
                    status: 'login failed',
                    message: 'Cannot find user with that email, please try again'
                });
            }

            const checkHash = await bcrypt.compare(password, user.password);

            if (!checkHash) {
                return res.status(400).json({
                    status: 'login failed',
                    message: 'Password incorrect, please try again'
                });
            }

            res.status(200).json({
                status: 'login success',
                token: jwt.sign({
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                }, process.env.JWT_SECRET || '123456', { expiresIn: '2h' }),
                user: {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                }
            });
        } catch(e) {
            req.app.locals.handleError(res, e);
        }
    }

}
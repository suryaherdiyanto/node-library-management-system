const jsonwebtoken = require('jsonwebtoken');

module.exports = {

    verifyUserToken: (req, res, next) => {

        try {
            const { authorization } = req.headers;

            if (!authorization) {
                throw new Error("Token not provided");
            }
            
            const [ tokenType, token ] = authorization.split(' ');

            if (tokenType !== 'Bearer') {
                throw new Error("Token type invalid");
            }
    
            req.user = jsonwebtoken.verify(token, process.env.JWT_SECRET || '');
            next();
            
        } catch (error) {
            res.status(400).json({
                statusCode: 400,
                name: error.name,
                message: error.message,
                stack: (process.env.APP_ENV !== 'production') ? error.stack:null
            });
        }
        
    }

}
const Router = require('express').Router();
const { verifyUserToken } = require('../middleware/verifytoken.js');
const BorrowController = require('../app/controllers/BorrowController.js');

Router.get('/', verifyUserToken, BorrowController.index);
Router.get('/:id', verifyUserToken, BorrowController.edit);
Router.post('/create', verifyUserToken, BorrowController.create);
Router.delete('/:id', verifyUserToken, BorrowController.destroy);

module.exports = Router;
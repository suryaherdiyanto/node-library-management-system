const router = require('express').Router();
const { verifyUserToken } = require('../middleware/verifytoken');
const BookController = require('../app/controllers/BookController');

router.get('/', verifyUserToken, BookController.index);
router.post('/', verifyUserToken, BookController.create);
router.get('/:id', verifyUserToken, BookController.edit);
router.put('/:id/update', verifyUserToken, BookController.update);
router.delete('/:id', verifyUserToken, BookController.destroy);

module.exports = router;
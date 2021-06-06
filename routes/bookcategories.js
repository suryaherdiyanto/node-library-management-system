const router = require('express').Router();
const { verifyUserToken } = require('../middleware/verifytoken.js');
const BookCategoryController = require('../app/controllers/BookCategoryController.js');

router.get('/', verifyUserToken, BookCategoryController.index);
router.post('/', verifyUserToken, BookCategoryController.create);
router.get('/:id', verifyUserToken, BookCategoryController.edit);
router.put('/:id/update', verifyUserToken, BookCategoryController.update);
router.delete('/:id', verifyUserToken, BookCategoryController.destroy);

module.exports = router;
const router = require('express').Router();
const { verifyUserToken } = require('../middleware/verifytoken');
const AuthorController = require('../app/controllers/AuthorController');

router.get('/', verifyUserToken, AuthorController.index);
router.post('/', verifyUserToken, AuthorController.create);
router.get('/:id', verifyUserToken, AuthorController.edit);
router.put('/:id/update', verifyUserToken, AuthorController.update);
router.delete('/:id', verifyUserToken, AuthorController.destroy);

module.exports = router;
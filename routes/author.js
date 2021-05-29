const router = require('express').Router();
const { verifyUserToken } = require('../middleware/verifytoken');
const AuthorController = require('../app/controllers/AuthorController');

router.get('/', verifyUserToken, AuthorController.index);
router.post('/', AuthorController.create);
router.get('/:id', AuthorController.edit);
router.put('/:id/update', AuthorController.update);
router.delete('/:id', AuthorController.destroy);

module.exports = router;
const router = require('express').Router();
const AuthorController = require('../app/controllers/AuthorController');

router.get('/', AuthorController.index);
router.post('/', AuthorController.create);
router.get('/:id', AuthorController.edit);
router.put('/:id/update', AuthorController.update);
router.delete('/:id', AuthorController.destroy);

module.exports = router;
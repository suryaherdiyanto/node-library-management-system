const router = require('express').Router();
const PublisherController = require('../app/controllers/PublisherController.js');
const { verifyUserToken } = require('../middleware/verifytoken.js');

router.get('/', verifyUserToken, PublisherController.index);
router.post('/', verifyUserToken, PublisherController.create);
router.get('/:id', verifyUserToken, PublisherController.edit);
router.put('/:id/update', verifyUserToken, PublisherController.update);
router.delete('/:id', verifyUserToken, PublisherController.destroy);

module.exports = router;
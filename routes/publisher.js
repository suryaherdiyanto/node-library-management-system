const router = require('express').Router();
const PublisherController = require('../app/controllers/PublisherController');

router.get('/', PublisherController.index);
router.post('/', PublisherController.create);
router.get('/:id', PublisherController.edit);
router.put('/:id/update', PublisherController.update);
router.delete('/:id', PublisherController.destroy);

module.exports = router;
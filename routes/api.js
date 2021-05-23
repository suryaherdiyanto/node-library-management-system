const router = require('express').Router();
const AuthController = require('../app/controllers/AuthController');

router.get('/', (req, res) => {
    res.status(200).json({
        test: 1000
    });
});

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

module.exports = router;
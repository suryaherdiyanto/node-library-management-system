const router = require('express').Router();

router.get('/', (req, res) => {
    res.status(200).json({
        test: 1000
    });
})

module.exports = router;
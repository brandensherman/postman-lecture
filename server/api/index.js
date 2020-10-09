const router = require('express').Router();

router.use('/book', require('./books'));

module.exports = router;

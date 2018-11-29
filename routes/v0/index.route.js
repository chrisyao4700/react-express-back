const express = require('express');
const router = express.Router();


router.use('/', async (req, res, next) => {
    res.json({status: false, message: 'V0 INDEX REACHED'});
});

module.exports = router;

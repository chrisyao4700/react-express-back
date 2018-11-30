const express = require('express');
const router = express.Router();
const v0Router = require('./v0/index.route');
const v1Router = require('./v1/index.route');

const func = require('od-utility');
const pkg = require('../package.json');

const versions = ((pkg_info) => Array((parseInt(pkg_info.version.split('.')[0]) || 0) + 1).fill(0).map((v, index) => `v${index}`))(pkg);
//[ 'v0', 'v1', 'v2' ]

router.use('/:version', async (req, res, next) => {
    try {
        const {version} = req.params;
        if (versions.indexOf(version) < 0) return func.throwError('VERSION NUM NOT SUPPORTED', 400);
        next();
    } catch (e) {
        next(e);
    }
});


router.use('/v0', v0Router);
router.use('/v1', v1Router);

router.use((req, res, next) => next(func.throwError('CANNOT FIND VERSION NUM', 404)));

module.exports = router;

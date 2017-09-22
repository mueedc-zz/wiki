const express = require('express');
const router = express.Router();

router.use('/wiki', require('./wiki'));
router.use('/user', require('./user'));

module.exports = router;

router.get('/', function (req, res, next) {
    res.send('got to GET /wiki/');
});

router.post('/', function (req, res, next) {
    res.send('got to POST /wiki/');
});
router.get('/add', function (req, res, next) {
    res.send('got to GET /wiki/add');
});

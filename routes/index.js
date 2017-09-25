const express = require('express');
const router = express.Router();
const wiki = require('./wiki.js');
const user = require('./user.js');

router.use('/wiki', wiki);
router.use('/user', user);


router.get('/', function (req, res, next) {
    console.log('Homepage');
    res.send('Homepage');
});

// router.post('/', function (req, res, next) {
//     res.send('got to POST /wiki/');
// });
// router.get('/add', function (req, res, next) {
//     res.render('addpage');
// });

module.exports = router;

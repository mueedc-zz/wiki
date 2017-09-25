const express = require('express');
const router = express.Router();
const wiki = require('./wiki.js');
const user = require('./user.js');
var models = require('../models');
var Page = models.Page;
var User = models.User;

router.use('/wiki', wiki);
router.use('/users', user);


router.get('/', function (req, res, next) {
    console.log('homepage');
    Page.findAll().then((page) => res.render('index', {pages: page}))
        .catch(next);
});

// router.post('/', function (req, res, next) {
//     res.send('got to POST /wiki/');
// });
// router.get('/add', function (req, res, next) {
//     res.render('addpage');
// });

module.exports = router;

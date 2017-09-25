const express = require('express');
const userRouter = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;
module.exports = userRouter;

userRouter.get('/:id', function (req, res, next) {
  const userID = req.params.id;
  var userPromise = User.findById(userID);
  var pagesPromise = Page.findAll({
    where: {
      authorId: userID
    }
  });

  Promise.all([
    userPromise,
    pagesPromise
  ])
  .then(function(values) {
    var user = values[0];
    var pages = values[1];
    // console.log(user);
    console.log(pages);
    res.render('user', { user: user, pages: pages });
  })
  .catch(next);
});

userRouter.get('/', function (req, res, next) {
  User.findAll().then((user) => res.render('users', {users: user}))
  .catch(next);
});

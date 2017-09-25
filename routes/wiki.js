const express = require('express');
const wikiRouter = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;
module.exports = wikiRouter;

wikiRouter.get('/', function (req, res, next) {
  console.log('redirected to homepage');
  res.redirect('/');
  // res.send('got to GET /wiki/');
});

wikiRouter.post('/', function (req, res, next) {
  console.log('Got wiki post');

  // Info
  const title = req.body.title;
  const content = req.body.content;
  const name = req.body.name;
  const email = req.body.email;
  const status = req.body.status;


  User.findOrCreate({
    where: {
      name: name,
      email: email
    }
  }).then( (values) => {
    const user = values[0];

    const page = Page.build({
      title: title,
      content: content
    });
    return page.save().then(
      (savedPage) => {
        return savedPage.setAuthor(user);
      }
    ).then((nextPage) => res.redirect(nextPage.route))
    .catch(next);
  });

  // res.json(req.body);
});
wikiRouter.get('/add', function (req, res, next) {
  res.render('addpage');
});

wikiRouter.get('/:urlTitle', (req, res, next) => {
  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    }
  }).then((foundPage) => res.render('wikipage', {foundPage: foundPage}))
  .catch(next);
});

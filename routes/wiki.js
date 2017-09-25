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
  const title = req.body.title;
  const content = req.body.content;
  // const url = generateUrlTitle(title);
  console.log(req.body);
  var page = Page.build({
    title: title,
    content: content
  });

  page.save().then(
    (savedPage) => res.redirect(savedPage.route)
  ).catch((err) => console.log('there was an err', err) );

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
  .catch(next)
})

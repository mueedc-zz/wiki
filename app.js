const express = require('express'),
    morgan = require('morgan'),
    nunjucks = require('nunjucks'),
    bodyParser = require('body-parser');
const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.engine('html', nunjucks.render);
app.set('view engine', 'html');
nunjucks.configure('views', {
    autoescape: true,
    express: app,
    noCache: true,
});

// app.use('/', routes);

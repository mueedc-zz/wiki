const express = require('express'),
    morgan = require('morgan'),
    nunjucks = require('nunjucks'),
    bodyParser = require('body-parser');
const app = express();
const routes = require('./routes');

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

app.use('/', routes);

// Where your server and express app are being defined:

var models = require('./models');

// ... other stuff


models.User.sync({})
.then(function () {
    return models.Page.sync({});
})
.then(function () {

    // make sure to replace the name below with your express app
    app.listen(3000, function () {
        console.log('Server is listening on port 3000!');
    });
})
.catch(console.error);



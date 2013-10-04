var express = require('express');
var app = express();
var hbs = require('hbs');
var blogController = require('./controllers/blogController');

// app config and middleware
app.engine('html', hbs.__express);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());
app.listen(3000);

// routes
app.get('/blog', blogController.list);
app.get('/blog/article/:id', blogController.view);
app.post('/blog/article', blogController.view);
app.all('/blog/new', blogController.add);

// no route matched = 404
app.get('*', function(request, response) {
	response.writeHead(404);
  	response.end("Page not found");
});
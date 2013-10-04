var http = require('http');

var count = 0;

http.createServer(function(req, res){
	console.log("proxy: " + count++);
	res.writeHead(200, {"Content-Length":5});
	res.end("hello");
}).listen(8000);

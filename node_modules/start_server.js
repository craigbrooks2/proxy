var http = require('http');
var url = require('url');
//var logger = require('logger');
var mappings = require('mappings');

http.createServer(function(req, res){
	var parsedURL = url.parse(req.url);
	
	if(mappings[parsedURL.path])
	{
		var options = mappings[parsedURL.path];
		req.headers.connection = "keep alive";
		options.headers = req.headers;
		options.headers.host = options.host;
	}
	else
	{
		res.writeHead(404);
		res.end();
		return; 
	}
	
	http.request(options, function(proxyResponse){
		for(var item in proxyResponse.headers) {
			res.setHeader(item, proxyResponse.headers[item]);
   		}
   		proxyResponse.on('error', function (e) {
			console.log(e.message);
  		});
		proxyResponse.on('data', function (chunk) {
  			 res.write(chunk);
  		});
  		proxyResponse.on('end', function () {
  			if(res.statusCode == 200) {
  				//logger.log(req, res);
  			}
			res.end();
			return;
  		});
	}).on('error', function(e){console.log(e.message);}).end();
	
	req.on('error', function(e){
		console.log(e.message);
	});
}).listen(8080);

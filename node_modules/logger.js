/*  // REDIS logging
redis = require('redis');
db = redis.createClient();

db.on("error", function (err) {
    console.log("Error " + err);
});

function log(request,response) {
	var time = new Date().getTime();
	
	var data = "Log: url=" + request.url + " , statuscode=" + response.statusCode;

	if(db.setnx(time, data))
	{
		console.log(data);
	}
	else
	{
		this(request,response);
	}
	
}
*/

// RIAK logging
var db = require('riak-js').getClient({host: "10.69.53.89", port: "10018"});
db.on("error", function (err) {
    console.log("Error " + err);
});

function log(request,response) {
	var count = 0;
	var tuple = {};
	tuple.time = new Date().getTime();
	tuple.url = request.url;
	tuple.status = response.statusCode;
	
	db.save('nodeLogs', null, tuple, function(err,tuple){
		if(err) {
			console.log(err);
		}
	});
}

module.exports.log = log;

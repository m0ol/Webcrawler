
var http = require('http');
const api = require('./api');


http.createServer(api.handleRequest).listen(8080);

//http.createServer(function(req, res){res.end("hello");}).listen(8080);

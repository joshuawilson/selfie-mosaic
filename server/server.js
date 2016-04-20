'use strict';
/**
* Serve the mobile environment on it's own port
**/

var http = require('http'),
    restify = require('restify'),
    path = require('path');

var app = restify.createServer(),
    port = 8081,
    ip = '0.0.0.0';

function respond(req, res, next) {
  res.send('hello ' + req.params.name);
  next();
}

app.get('/hello/:name', respond);
app.head('/hello/:name', respond);

var staticDir = path.normalize(__dirname + '/../client');

app.get(/.*/, restify.serveStatic({
  directory: staticDir,
  default: 'index.html'
}));

// var server = http.createServer(app);
app.listen(port, ip);
console.log(`Serving ${staticDir} on ${ip}:${port}`);

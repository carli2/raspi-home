var express = require('express');
var app = express();

var logic = require('./logic.js');
var lights = require('./lights-i2c.js');

lights.init();
app.use(express.static(__dirname));
function sendMainPage(req, res, status) {
	html = ('<!DOCTYPE html>\n'+
	'<html> <head> <title>Launix-Relay</title> <meta charset=\"utf-8\"> <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"> <link rel=\"stylesheet\" type=\"text/css\" href=\"/node_modules/bootstrap/dist/css/bootstrap.min.css\"> <link rel=\"stylesheet\" type=\"text/css\" href=\"/index.css\"> <script src=\"https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js\"></script> <script src=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js\"></script> </head> <body>');
	html += logic.page();
	if (status) {
		html += ('Status: ' + status + '<br>');
	}
	html +=('<script type="text/javascript">setTimeout(function(){location.href="/";},10000);</script>');
	html +=('</body></html>');
	res.send(html);
}

app.get('/', function (req, res) {
	sendMainPage(req, res);
})

app.get('/action/:action/:parameter?', function (req, res) {
	var action = req.params.action;
	var parameter = req.params.parameter;
	sendMainPage(req, res, logic.action (action, parameter));
});

app.listen(80);

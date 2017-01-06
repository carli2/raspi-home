var express = require('express');
var app = express();

var logic = require('./logic.js');
var lights = require('./lights.js');

lights.init();

function sendMainPage(req, res, status) {
	html = ('TODO: HTML Grundgerüst<br>');
	if (status) {
		html += ('Status: ' + status + '<br>');
	}
	html +=(logic.page());
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

app.listen(8000);

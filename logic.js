var lights = require('./lights.js');

module.exports.page = function () {
	var html = '<div class=\"container-fluid\">';
	html += '<div class=\"buttons btn-group-lg\">';
	html += '<h3>Flur Licht:</h3>  <a class=\"btn-primary btn-large btn\" href=\"/action/lighton/0\">an</a> <a class=\"btn-primary btn btn-large\" href=\"/action/lightoff/0\">aus</a> <br>';
	html += '<h3>Flur Hinten:</h3>  <a class=\"btn-primary btn-large btn\" href=\"/action/lighton/1\">an</a> <a class=\"btn-primary btn btn-large\" href=\"/action/lightoff/1\">aus</a> <br>';
	html += '<h3>Flur Draussen:</h3>  <a class=\"btn-primary btn-large btn\" href=\"/action/lighton/2\">an</a> <a class=\"btn-primary btn btn-large\" href=\"/action/lightoff/2\">aus</a> <br>';
	html += '<h3>Flur Stube:</h3>  <a class=\"btn-primary btn-large btn\" href=\"/action/lighton/3\">an</a> <a class=\"btn-primary btn btn-large\" href=\"/action/lightoff/3\">aus</a> <br>';
	html += '<h3>Blinken:</h3> <a class=\"btn-primary btn-large btn-block btn\" href=\"/action/blink\">Click!</a> <br>';
	return html;
}

module.exports.action = function (action, parameter) {
	if (action == "lighton") {
		lights.on(parameter);
	}
	if (action == "lightoff") {
		lights.off(parameter);
	}
	if (action == "blink") {
		lights.on(0);
		setTimeout(function () { lights.off(0); }, 1000);
	}

	// Status angeben
	return 'Aktion: ' + action + ', Parameter: ' + parameter;
}

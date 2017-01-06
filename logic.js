var lights = require('./lights.js');

module.exports.page = function () {
	var html = 'Flur Licht <a href="/action/lighton/0">an</a>/<a href="/action/lightoff/0">aus</a> <br>';
	html += 'Flur Hinten <a href="/action/lighton/1">an</a>/<a href="/action/lightoff/1">aus</a> <br>';
	html += 'Draussen <a href="/action/lighton/2">an</a>/<a href="/action/lightoff/2">aus</a> <br>';
	html += 'Stube <a href="/action/lighton/3">an</a>/<a href="/action/lightoff/3">aus</a> <br>';
	html += '<a href="/action/blink">blinken</a>';
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

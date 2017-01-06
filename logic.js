var lights = require('./lights.js');

module.exports.page = function () {
	var html = 'Flur Licht <a href="/action/lighton/0">an</a>/<a href="/action/lightoff/0">aus</a> <br>';
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

var lights = require('./lights.js');

module.exports.page = function () {
	return '<a href="/action/go">go</a>';
}

module.exports.action = function (action, parameter) {
	lights.on(0);
	setTimeout(function () { lights.off(0); }, 1000);

	// Status angeben
	return 'Aktion: ' + action + ', Parameter: ' + parameter;
}

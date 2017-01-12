var lights = require('./lights-i2c.js');

var lampen = ['Flur Licht', 'Flur Hinten', 'Draussen', 'Stube'/*, 'Flur Oben'*/];

var lebenszeit = [];
for (var i = 0; i < lampen.length; i++) lebenszeit.push(0);

function tick() {
	for (var i = 0; i < lampen.length; i++) {
		if (lebenszeit [i] > 0) {
			lebenszeit [i] = lebenszeit [i] - 1;
		}
		lights.set(i, lebenszeit [i] != 0);
	}
	setTimeout(tick, 1000);
}

tick();

module.exports.page = function () {
	var html = '<div class=\"container-fluid\">';
	html += '<div class=\"buttons btn-group-lg\">';

	// Schleife durch alle Lampen
	for (var i = 0; i < lampen.length; i++) {
		html += '<h3 class="links">' + lampen[i] + '</h3>';
		if (lights.get(i)) {
			html += '<a class=\"btn-primary btn-large btn rechts"\ href="/action/daueraus/' + i + '"><img src="/img/licht_an.png" height=20></a> ';
		} else {
			html += '<a class=\"btn-primary btn-large btn rechts"\ href="/action/daueran/' + i + '"><img src="/img/licht_aus2.png" height=20></a> ';
		}

		html += '<a class="btn rechts" style="padding: 10px 6px;" href="/action/1h/' + i + '">1h</a>';
		html += '<a class="btn rechts" style="padding: 10px 6px;" href="/action/15m/' + i + '">15m</a>';
		html += '<a class="btn rechts" style="padding: 10px 6px;" href="/action/5m/' + i + '">5m</a>';
		html +='<br class="clear">' ;
	 }
	return html;
}

module.exports.action = function (action, parameter) {

	 if (action == "daueraus") {
		lebenszeit [parameter] = 0;
		lights.off(parameter);
		return 'Das Licht ist nun aus.';
	}
	if (action == "daueran") {
		lebenszeit [parameter] = -1;
		lights.on(parameter);
		return 'Das Licht ist nun an.';
	}
	if (action == "5m") {
		lebenszeit [parameter] = 5 * 60;
		lights.on(parameter);
		return 'Das Licht ist nun 5 Minuten an.';
	}
	if (action == "15m") {
		lebenszeit [parameter] = 15 * 60;
		lights.on(parameter);
		return 'Das Licht ist nun 15 Minuten an.';
	}
	if (action == "1h") {
		lebenszeit [parameter] = 60 * 60;
		lights.on(parameter);
		return 'Das Licht ist nun 1 Stunde an.';
	}
	// Status angeben

	return 'Aktion: ' + action + ', Parameter: ' + parameter;

}

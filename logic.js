var i2c = require('./lights-i2c.js');

var bank = new i2c.LightBank(1, '0x38');

var lampen = [
	{
		title: 'Flur Ofen',
		light: bank.getLight(0)
	},
	{
		title: 'Flur Hinten',
		light: bank.getLight(1)
	},
	{
		title: 'Draußen',
		light: bank.getLight(2)
	},
	{
		title: 'Stube',
		light: bank.getLight(3)
	}
];

var lebenszeit = [];
for (var i = 0; i < lampen.length; i++) lampen[i].lebenszeit = 0;

function tick() {
	for (var i = 0; i < lampen.length; i++) {
		if (lampen[i].lebenszeit > 0) {
			lampen[i].lebenszeit = lampen[i].lebenszeit - 1;
		}
		lampen[i].light.set(lampen[i].lebenszeit != 0);
	}
	setTimeout(tick, 1000);
}

tick();

module.exports.page = function () {
	var html = '<div class=\"container-fluid\">';
	html += '<div class=\"buttons btn-group-lg\">';

	// Schleife durch alle Lampen
	for (var i = 0; i < lampen.length; i++) {
		html += '<h3 class="links">' + lampen[i].title + '</h3>';
		if (lampen[i].light.get()) {
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
		lampen[parameter].lebenszeit = 0;
		lampen[parameter].light.off();
		return 'Das Licht ist nun aus.';
	}
	if (action == "daueran") {
		lampen[parameter].lebenszeit = -1;
		lampen[parameter].light.on();
		return 'Das Licht ist nun an.';
	}
	if (action == "5m") {
		lampen[parameter].lebenszeit = 5 * 60;
		lampen[parameter].light.on();
		return 'Das Licht ist nun 5 Minuten an.';
	}
	if (action == "15m") {
		lampen[parameter].lebenszeit = 15 * 60;
		lampen[parameter].light.on();
		return 'Das Licht ist nun 15 Minuten an.';
	}
	if (action == "1h") {
		lampen[parameter].lebenszeit = 60 * 60;
		lampen[parameter].light.on();
		return 'Das Licht ist nun 1 Stunde an.';
	}
	// Status angeben

	return 'Aktion: ' + action + ', Parameter: ' + parameter;

}

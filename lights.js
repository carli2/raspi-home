var fs = require('fs');
var exportPath = "/sys/class/gpio/export";
var gpioPath = "/sys/class/gpio/gpio";

var pins = [24, 25, 12, 16, 20, 21, 17, 27];

var files = []; // file handles

module.exports = {
	init: function() {
		// GPIO-Filesystem initialisieren
		for (var i = 0; i < pins.length; i++) {
			fs.writeFileSync(exportPath, pins[i]);
			fs.writeFileSync(gpioPath + pins[i] + "/direction", "out");
		}
	},
	on: function (idx) {
		this.set(idx, 1);
	},
	off: function (idx) {
		this.set(idx, 0);
	},
	toggle: function (idx) {
		if (this.get(idx)) {
			this.set(idx, 0);
		} else {
			this.set(idx, 1);
		}
	},
	set: function (idx, value) {
		fs.writeSync(gpiopath + pins[idx] + "/value", value);
	},
	get: function (idx) {
		return Number(fs.readFileSync(gpiopath + pins[idx] + "/value"));
	}
}

var fs = require('fs');
var exportPath = "/sys/class/gpio/export";
var gpioPath = "/sys/class/gpio/gpio";

var files = []; // file handles

function GPIOLight(pin) {
	fs.writeFileSync(exportPath, pin);
	fs.writeFileSync(gpioPath + pin + "/direction", "out");

	this.on = function () { this.set(1); }
	this.off = function () { this.set(0); }
	this.toggle = function () { if (this.get()) this.set(0); else this.set(1); }
	this.set = function (val) {
		fs.writeFileSync(gpioPath + pin + "/value", value ? "0" : "1");
	}
	this.get = function () {
		return Number(fs.readFileSync(gpioPath + pin + "/value")) ? 0 : 1;
	}
}

module.exports = {
	GPIOLight: GPIOLight
}

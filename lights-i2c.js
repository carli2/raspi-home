var fs = require('fs');
var spawn = require('child_process').spawn;
var address = '0x38', bus = '1';

var val = 0x00;

spawn('i2cwrite', ['-y', bus, address, val]);


module.exports = {
	init: function() {
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
		val = val & ~(1 << idx);
		if (value) val = val | 1 << idx;
		spawn('i2cwrite', ['-y', bus, address, val]);
	},
	get: function (idx) {
		return (val >> idx) & 1;
	}
}

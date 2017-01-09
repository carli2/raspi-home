var fs = require('fs');
var i2c = require('i2c');
var address = 0x38;
var wire = new i2c(address, {device: '/dev/i2c-1'});

var val = 0x00;

wire.writeByte(val);


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
		wire.writeByte(val);
	},
	get: function (idx) {
		return (val >> idx) & 1;
	}
}

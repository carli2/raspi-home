var fs = require('fs');
var spawn = require('child_process').spawn;
var address = '0x38', bus = '1';


function LightBank(bus, address) {
	var val = 0xff;
	spawn('i2cset', ['-y', bus, address, val]);
	this.getLight = function(idx) {
		if (idx >= 0 && idx < 8) {
			return {
				on: function () { this.set(1); },
				off: function () { this.set(0); },
				toggle: function () { if (this.get()) this.set(0); else this.set(1); },
				set: function (value) {
					val = val & ~(1 << idx);
					if (!value) val = val | 1 << idx;
					spawn('i2cset', ['-y', bus, address, val]);
				},
				get: function () {
					return 1 - ((val >> idx) & 1);
				}
			}
		} else {
			throw new Error("Light " + idx + " not available");
		}
	}
}

module.exports = {
	LightBank: LightBank
}

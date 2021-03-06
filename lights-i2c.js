var fs = require('fs');
var spawn = require('child_process').spawn;

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

	this.getButton = function (idx, invert) {
		val |= 1 << idx; // pull high
		spawn('i2cset', ['-y', bus, address, val]);
		return {
			get: function (resultfn) {
				var result = '';
				var p = spawn('i2cget', ['-y', bus, address]);
				p.stdout.on('data', function (x) { result += x; });
				p.stdout.on('end', function (x) {
					if (result[0] == '0' && result[1] == 'x') {
						val = parseInt(result);
					}
					var bit = (val >> idx) & 1;
					if (invert) bit = 1 - bit;
					resultfn(bit);
				});
			}
		}
	}
}

module.exports = {
	LightBank: LightBank
}

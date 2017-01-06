var pins = [24, 25, 12, 16, 20, 21, 17, 27];

var files = []; // file handles
// TODO: GPIO-Filesystem initialisieren

module.exports = {
	on: function (idx) { this.set(idx, 1); },
	off: function (idx) {},
	toggle: function (idx) {},
	set: function (idx, value) {},
	get: function (idx) {}
}

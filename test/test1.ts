/// <reference path="../bower_components/dt-node/node.d.ts" />

import tsc = require('../lib/compiler');
var compiler = new tsc.Compiler();

compiler.compileSource('() => {};', tsSource => {
	console.log('source:', tsSource);
});

compiler.compileSource('var x: string;', tsSource => {
	console.log('source:', tsSource);
});

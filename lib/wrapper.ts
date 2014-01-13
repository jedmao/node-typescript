/// <reference path="../bower_components/dt-node/node.d.ts" />

var fs = require('fs'),
	path = require('path'),
	vm = require('vm');

(() => {
	var sandbox = { expTypeScript: null };

	var typescriptmodulefile = require.resolve("typescript");
	var location = path.dirname(typescriptmodulefile);
	var tmp = module.exports._libdPath = require.resolve(location + '/lib.d.ts');

	var contents = [
		"(function() {",
		fs.readFileSync(typescriptmodulefile, "utf8"),
		"expTypeScript = TypeScript;",
		"}).call({});"
	].join("");

	vm.runInNewContext(contents, sandbox, 'ts.vm');

	var TypeScript = module.exports.TypeScript = sandbox.expTypeScript;
	TypeScript.moduleGenTarget = TypeScript.ModuleGenTarget.Synchronous;
})();

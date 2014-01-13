var fs = require('fs');
var vm = require('vm');

var tsPath = require.resolve('typescript');
var typeScriptSource = String(fs.readFileSync(tsPath, 'utf8'));
var sandbox = {};

vm.runInNewContext(typeScriptSource, sandbox);

exports.TypeScript = sandbox.TypeScript;

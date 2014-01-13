/// <reference path='../bower_components/dt-node/node.d.ts' />
import fs = require('fs');
import vm = require('vm');


var tsPath = require.resolve('typescript');
var typeScriptSource = String(fs.readFileSync(tsPath, 'utf8'));
var sandbox: any = {};

vm.runInNewContext(typeScriptSource, sandbox);

export var TypeScript = sandbox.TypeScript;

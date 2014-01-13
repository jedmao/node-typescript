/// <reference path="../bower_components/dt-node/node.d.ts" />

import wrapper = require('./wrapper');
var TypeScript = wrapper.TypeScript;

export class Compiler {

	private _compiler;
	private _logger = new Logger();

	constructor(logger?: Logger, compilationSettings?: any) {
		this._logger = logger || new Logger();
		this._compiler = new TypeScript.TypeScriptCompiler(this._logger, compilationSettings);
	}

	//compile(...args: any[]) {
	//	this._compiler.compile(this, args);
	//	//compiler.addFile(resolvedFile.path, sourceFile.scriptSnapshot, sourceFile.byteOrderMark, 0, false, resolvedFile.referencedFiles);
	//}

	compileSource(source: string, cb: Function) {
		var scriptSnapshot = TypeScript.ScriptSnapshot.fromString(source);
		this._compiler.addFile('.', scriptSnapshot);
		for (var it = this._compiler.compile(); it.moveNext();) {
			var result = it.current();
			result.outputFiles.forEach(outputFile => {
				cb(outputFile.text);
			});
		}
	}
}

export class Logger {
	information(message: string) {
		this.message('information', message);
	}
	debug(message: string) {
		this.message('debug', message);
	}
	warning(message: string) {
		this.message('warning', message);
	}
	error(message: string) {
		this.message('error', message);
	}
	fatal(message: string) {
		this.message('fatal', message);
	}
	log(message: string) {
		this.message('log', message);
	}
	private message(messageType: string, message: string) {
		console.log('[typescript] [' + messageType + ']: ' + message);
	}
}

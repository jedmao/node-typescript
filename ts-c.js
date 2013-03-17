var tsc = require('./lib/compiler');

exports.compile = function(file, code){
	var compiler = tsc.compiler;
	tsc.initDefault();
	tsc.resolve(file, code, compiler);
	compiler.typeCheck();
	var stdout = new tsc.EmitterIOHost();
	compiler.emit(stdout);
	return stdout.fileCollection[file.replace('.ts', '.js')].lines.join('');
}

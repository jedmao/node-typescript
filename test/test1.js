var compiler = require('../lib/compiler').compiler;
var EmitterIOHost = require('../lib/compiler').EmitterIOHost;

compiler.parser.errorRecovery = true;
compiler.setErrorCallback(		function (start, len, message, block) {
		console.log('Compilation error: ', message, '\n Code block: ', block, ' Start position: ', start, ' Length: ', len);
	});

compiler.addUnit('class TEste{name:string;}', 'xxx');

compiler.typeCheck();

var stdout = new EmitterIOHost();
compiler.emit(stdout);
console.log(stdout.fileCollection)

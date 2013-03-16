var fs = require('fs');
var compiler = require('../lib/compiler').compiler;
var EmitterIOHost = require('../lib/compiler').EmitterIOHost;
var libdPath = require("../lib/compiler").libdPath;

compiler.parser.errorRecovery = true;
compiler.setErrorCallback(function (start, len, message, block) {
	console.log('Compilation error: ', message, '\n Code block: ', block, ' Start position: ', start, ' Length: ', len);
});

compiler.addUnit(fs.readFileSync(libdPath, 'utf8'), libdPath);
	
compiler.addUnit('\
class Greeter {\
    greeting: string;\
    constructor(message: string) {\
        this.greeting = message;\
    }\
    greet() {\
        return "Hello, " + this.greeting;\
    }\
}\
var greeter = new Greeter("world");\
var button = document.createElement("button");\
button.innerText = "Say Hello";\
button.onclick = function() {\
    alert(greeter.greet());\
};\
document.body.appendChild(button);\
', 'xxx');

compiler.typeCheck();

var stdout = new EmitterIOHost();
compiler.emit(stdout);
console.log(stdout.fileCollection)

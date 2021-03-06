node-typescript
===============

The TypeScript API exposed to nodejs. Use to compile typescript code in memory.

## Usage

install `node-typescript` with npm:

	npm i node-typescript

Create a file with this sample code:

```javascript
var tsc = require('./node_modules/node-typescript/lib/compiler');
var compiler = tsc.compiler;

tsc.initDefault();

var code = '\
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
';

tsc.resolve(__dirname + '/xxx.ts', code, compiler);

compiler.typeCheck();

var stdout = new tsc.EmitterIOHost();
compiler.emit(stdout);
```

Get the javascript output in `stdout.fileCollection`. To this example the javascript output is:

```javascript
{ '.../xxx.js':
   { lines:
      [ 'var Greeter = (function () {',
        '    function Greeter(message) {',
        '        this.greeting = message;',
        '    }',
        '    Greeter.prototype.greet = function () {',
        '        return "Hello, " + this.greeting;',
        '    };',
        '    return Greeter;',
        '})();',
        'var greeter = new Greeter("world");',
        'var button = document.createElement("button");',
        'button.innerText = "Say Hello";',
        'button.onclick = function () {',
        '    alert(greeter.greet());',
        '};',
        'document.body.appendChild(button);' ],
     currentLine: '' } }
```
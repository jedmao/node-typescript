var tsc = require('../lib/compiler');
var compiler = new tsc.Compiler();

compiler.compileSource('() => {};', function (tsSource) {
    console.log('source:', tsSource);
});

compiler.compileSource('var x: string;', function (tsSource) {
    console.log('source:', tsSource);
});

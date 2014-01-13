var wrapper = require('./wrapper');
var TypeScript = wrapper.TypeScript;

var Compiler = (function () {
    function Compiler(logger, compilationSettings) {
        this._logger = new Logger();
        this._logger = logger || new Logger();
        this._compiler = new TypeScript.TypeScriptCompiler(this._logger, compilationSettings);
    }
    Compiler.prototype.compileSource = function (source, cb) {
        var scriptSnapshot = TypeScript.ScriptSnapshot.fromString(source);
        this._compiler.addFile('.', scriptSnapshot);
        for (var it = this._compiler.compile(); it.moveNext();) {
            var result = it.current();
            result.outputFiles.forEach(function (outputFile) {
                cb(outputFile.text);
            });
        }
    };
    return Compiler;
})();
exports.Compiler = Compiler;

var Logger = (function () {
    function Logger() {
    }
    Logger.prototype.information = function (message) {
        this.message('information', message);
    };
    Logger.prototype.debug = function (message) {
        this.message('debug', message);
    };
    Logger.prototype.warning = function (message) {
        this.message('warning', message);
    };
    Logger.prototype.error = function (message) {
        this.message('error', message);
    };
    Logger.prototype.fatal = function (message) {
        this.message('fatal', message);
    };
    Logger.prototype.log = function (message) {
        this.message('log', message);
    };
    Logger.prototype.message = function (messageType, message) {
        console.log('[typescript] [' + messageType + ']: ' + message);
    };
    return Logger;
})();
exports.Logger = Logger;

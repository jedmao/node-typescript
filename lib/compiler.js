var TypeScript = require("./wrapper.js").TypeScript;
var WriterAggregator = (function () {
    function WriterAggregator() {
        this.lines = [];
        this.currentLine = "";
    }
    WriterAggregator.prototype.Write = function (str) {
        this.currentLine += str;
    };
    WriterAggregator.prototype.WriteLine = function (str) {
        this.lines.push(this.currentLine + str);
        this.currentLine = "";
    };
    WriterAggregator.prototype.Close = function () {
        if(this.currentLine.length > 0) {
            this.lines.push(this.currentLine);
        }
        this.currentLine = "";
    };
    WriterAggregator.prototype.reset = function () {
        this.lines = [];
        this.currentLine = "";
    };
    return WriterAggregator;
})();
exports.WriterAggregator = WriterAggregator;
var EmitterIOHost = (function () {
    function EmitterIOHost() {
        this.fileCollection = {
        };
    }
    EmitterIOHost.prototype.createFile = function (s, useUTF8) {
        if(this.fileCollection[s]) {
            return this.fileCollection[s];
        }
        var writer = new WriterAggregator();
        this.fileCollection[s] = writer;
        return writer;
    };
    EmitterIOHost.prototype.directoryExists = function (s) {
        return false;
    };
    EmitterIOHost.prototype.fileExists = function (s) {
        return typeof this.fileCollection[s] !== 'undefined';
    };
    EmitterIOHost.prototype.resolvePath = function (s) {
        return s;
    };
    EmitterIOHost.prototype.reset = function () {
        this.fileCollection = {
        };
    };
    EmitterIOHost.prototype.toArray = function () {
        var result = [];
        for(var p in this.fileCollection) {
            if(this.fileCollection.hasOwnProperty(p)) {
                var current = this.fileCollection[p];
                if(current.lines.length > 0) {
                    if(p !== '0.js') {
                        current.lines.unshift('////[' + p + ']');
                    }
                    result.push({
                        filename: p,
                        file: this.fileCollection[p]
                    });
                }
            }
        }
        return result;
    };
    return EmitterIOHost;
})();
exports.EmitterIOHost = EmitterIOHost;
exports.compiler = new TypeScript.TypeScriptCompiler(new WriterAggregator());

/// <reference path="typings/DefinitelyTyped/node/node.d.ts" />
/// <reference path="wrapper.d.ts" />

var TypeScript = require("./wrapper.js").TypeScript;

// Aggregate various writes into a single array of lines. Useful for passing to the
// TypeScript compiler to fill with source code or errors.
export class WriterAggregator implements ITextWriter {
    public lines: string[] = [];
    public currentLine = "";

    public Write(str) {
        this.currentLine += str;
    }

    public WriteLine(str) {
        this.lines.push(this.currentLine + str);
        this.currentLine = "";
    }

    public Close() {
        if (this.currentLine.length > 0) { this.lines.push(this.currentLine); }
        this.currentLine = "";
    }

    public reset() {
        this.lines = [];
        this.currentLine = "";
    }
}

// Mimics having multiple files, later concatenated to a single file.
export class EmitterIOHost implements TypeScript.EmitterIOHost {

    private fileCollection = {};

    // create file gets the whole path to create, so this works as expected with the --out parameter
    public createFile(s: string, useUTF8?: bool): ITextWriter {

        if (this.fileCollection[s]) {
            return <ITextWriter>this.fileCollection[s];
        }

        var writer = new WriterAggregator();
        this.fileCollection[s] = writer;
        return writer;
    }

    public directoryExists(s: string) { return false; }
    public fileExists(s: string) { return typeof this.fileCollection[s] !== 'undefined'; }
    public resolvePath(s: string) { return s; }

    public reset() { this.fileCollection = {}; }

    public toArray(): { filename: string; file: WriterAggregator; }[] {
        var result: { filename: string; file: WriterAggregator; }[] = [];

        for (var p in this.fileCollection) {
            if (this.fileCollection.hasOwnProperty(p)) {
                var current = <WriterAggregator>this.fileCollection[p];
                if (current.lines.length > 0) {
                    if (p !== '0.js') { current.lines.unshift('////[' + p + ']'); }
                    result.push({ filename: p, file: this.fileCollection[p] });
                }
            }
        }

        return result;
    }
}

export var compiler = new TypeScript.TypeScriptCompiler(new WriterAggregator());

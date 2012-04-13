#!/usr/bin/env node
// @TODO +++ Fix the use of the parser in shepherd and fix the matching of module description and what's expected from Shepherd.
// @TODO +   Add an index.js for automatic discovery in NodeJS

var fs = require('fs'),
    jsp = require("uglify-js").parser,
    pro = require("uglify-js").uglify;

var parserLocation = './lib/harmony-parser/harmony_parser.js',
    whenLocation = './lib/when/when.js',
    shepherdLocation = './src/shepherd.js';

function run (min) {
    // Scopes the parser so it doesn't pollute globals
    // Declaring exports to undefined avoids CommonJS exports
    var parserCode = '(function() {var exports;' + fs.readFileSync(parserLocation).toString() + ';return harmony_parser;})();';
    var shepherdCode = fs.readFileSync(shepherdLocation).toString();
    var whenCode = '(function() {var module = {};' + fs.readFileSync(whenLocation).toString() + ';return module.exports;})();';
    var output;

    if (min) {
        var parserAst = jsp.parse(parserCode);
        parserAst = pro.ast_mangle(parserAst, {defines: {require: ['name', 'undefined'], exports: ['name', 'undefined']}});
        parserAst = pro.ast_squeeze(parserAst);
        var parserMinified = pro.gen_code(parserAst, {beautify: false});
        var whenAst = jsp.parse(whenCode);
        whenAst = pro.ast_mangle(whenAst, {beautify: false, defines: {require: ['module', 'undefined']}});
        whenAst = pro.ast_squeeze(whenAst);
        var whenMinified = pro.gen_code(whenAst);
        var shepherdAst = jsp.parse(shepherdCode);
        shepherdAst = pro.ast_mangle(shepherdAst, {beautify: false, defines: {MINIFY: ['name', true], harmonyParser: ['name', parserMinified], when: ['name', whenMinified]}});
        shepherdAst = pro.ast_squeeze(shepherdAst);
        output = pro.gen_code(shepherdAst);
    } else {
        devCode = '(function () {' +
            'var harmonyParser = ' + parserCode + ';\n' +
            'var when = ' + whenCode + ';\n' +
            shepherdCode +
            '})()';
        var devAst = jsp.parse(devCode);
        output = pro.gen_code(devAst, {beautify: true});
    }
    fs.writeFileSync('./build/shepherd.' + (min ? 'min' : 'dev') + '.js', output);
}

function build () {
    var msg;
    try {
        run(true);
        run();
        msg = 'Shepherd built on: ' + (new Date()).toString();
    } catch (e) {
        msg = 'Build failed. (' + e.message + ')';
    }
    console.log(msg);
}

build();

fs.watch(parserLocation, build);
fs.watch(shepherdLocation, build);
fs.watch(whenLocation, build);

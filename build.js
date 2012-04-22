#!/usr/bin/env node
// @TODO +++ Fix the use of the parser in shepherd and fix the matching of module description and what's expected from Shepherd.
// @TODO +   Add an index.js for automatic discovery in NodeJS

var fs = require('fs'),
    jsp = require("uglify-js").parser,
    pro = require("uglify-js").uglify;

var parserLocation = './lib/harmony-parser/harmony_parser.js',
    whenLocation = './lib/when/when.js',
    shepherdLocation = './src/shepherd.js';

var flavourConfig = {
    'client-dev' : {
        min: false,
        flavourFile: './src/flavours/browser.js',
        outputSuffix: 'dev'
    },
    'client' : {
        min: true,
        flavourFile: './src/flavours/browser.js',
        outputSuffix: 'min'
    },
    'server' : {
        min: true,
        flavourFile: './src/flavours/server.js',
        outputSuffix: 'server'
    }
};

function run (flavourKey) {
    var flavour = flavourConfig[flavourKey];

    // Scopes the parser so it doesn't pollute globals
    // Declaring exports to undefined avoids CommonJS exports
    var parserCode = '(function() {var exports;' + fs.readFileSync(parserLocation).toString() + ';return harmony_parser;})();';
    var shepherdCode = fs.readFileSync(shepherdLocation).toString();
    var whenCode = '(function() {var module = {};' + fs.readFileSync(whenLocation).toString() + ';return module.exports;})();';
    var flavourCode = fs.readFileSync(flavour.flavourFile).toString();
    var output;

    devCode = '(function () {' +
        'var harmonyParser = ' + parserCode + ';\n' +
        'var when = ' + whenCode + ';\n' +
        'var flavour = ' + flavourCode + ';\n' +
        shepherdCode +
        '})()';
    var devAst = jsp.parse(devCode);
    if (flavour.min) {
        devAst = pro.ast_mangle(devAst, {defines: {MINIFY: ['name', true]}});
        devAst = pro.ast_squeeze(devAst);
    }
    output = pro.gen_code(devAst, {beautify: !flavour.min});
    fs.writeFileSync('./build/shepherd.' + flavour.outputSuffix + '.js', output);
}

function build () {
    for (var i in flavourConfig) {
        if (!flavourConfig.hasOwnProperty(i)) { continue;}
        var msg;
        try {
            run(i);
            msg = 'Built Shepherd with flavour ' + i + ' on: ' + (new Date()).toString();
        } catch (e) {
            msg = 'Build of flavour ' + i + ' failed. (' + e.message + ')';
        }
        console.log(msg);        
    }
}

build();

fs.watch(parserLocation, build);
fs.watch(shepherdLocation, build);
fs.watch(whenLocation, build);

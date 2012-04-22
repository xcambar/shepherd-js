
var argv = require('optimist')
    .usage('Minifies your dependencies declared with Harmony\'s modules syntax.')
    .alias('b', 'basepath')
    .describe('b', 'basepath for your modules. Useful if the location of your modules is not your root folder.')
    .alias('o', 'out')
    .describe('o', 'output file')
    .demand('_')
    .argv,
    jsp = require("uglify-js").parser,
    pro = require("uglify-js").uglify,
    s6d = require('../build/shepherd.optimizer.js');

s6d({exposeAPI: true}); // Allows to fetch the flavour and its data

//
// OPTION PARSING
//
var _input = argv._;
if (_input.length > 1) {
    console.error('You can only minify one app at a time.');
}

var cwd = process.cwd();
if(argv.b) {
    process.chdir(argv.b);
}
s6d(_input[0]);
if(argv.b) {
    process.chdir(cwd);
}

//
// Optimizer
//

var mods = s6d.flavour.getModules();

//
// Custom JSON.stringify as we need to output functions and they get quoted if treated as strings
//
var fns = [];
for (var i = 0; i < mods.length; i++) {
    fns.push('{' +
        'fn:' + Function.apply({}, mods[i].argNames.concat(mods[i].body + '; return ' + mods[i].exports)).toString() + ',' +
        'argsRefs:' + JSON.stringify(mods[i].argRefs) +
    '}');
}

var buffer =
"(function () {" +
    "var mods = [" +
        fns.join(',') +
    "];" +
    "for (var i=0; i < mods.length; i++) {" +
        "var module = mods[i]," +
        "    fn = module.fn," +
        "    args = [];" +
        "for (var j=0; j<module.argsRefs.length; j++) {" +
            "args.push(mods[module.argsRefs[j]]);" +
        "}" +
        "mods[i] = fn.apply(fn, args);" +
    "}" +
"})()";

buffer = jsp.parse(buffer);
buffer = pro.ast_mangle(buffer);
buffer = pro.ast_squeeze(buffer);
buffer = pro.gen_code(buffer, {beautify: false});

if (argv.o) {
    require('fs').writeFile(argv.o, buffer, function (err) {
        if (err) {
            throw err;
        }
    });
} else {
    require('util').print(buffer);
}
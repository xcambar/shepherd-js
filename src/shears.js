var s6d = require('../build/shepherd.optimizer.js');
s6d({exposeAPI: true});
s6d('fixtures/recursive/useCase2/index.js');

var buffer =
"(function () {" +
    "var mods = " + JSON.stringify(s6d.flavour.getModules()) + ";" +
    "for (var i=0; i<mods.length; i++) {" +
        "var module = mods[i];" +
        "var fn = Function.apply({}, module.argNames.concat(module.body + '; return ' + module.exports));" +
        "var args = [];" +
        "for (var j=0; j<module.argRefs.length; j++) {" +
            "args.push(mods[module.argRefs[j]]);" +
        "}" +
        "mods[i] = fn.apply(fn, args);" +
    "}" +
"})()";

console.log(buffer);
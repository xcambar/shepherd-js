/**
 * !! Module declaration MUST be the header of the file
 * 
 * @see http://wiki.ecmascript.org/doku.php?id=harmony:modules for parsing and use case reference
 * @see http://addyosmani.com/writing-modular-js/
 */
(function (me) {
    var modules = {},
        _errCb,
        _errModules = null;
    
    /**
     * Parses the module declaration and prepares the execution context of the module
     * @param {Array} An array of text of lines. Each line is a fragment of a module declaration
     * @return {Object|String} Returns the module's evaluated execution context or an error string 
     */
    var parse = function (declaration, conf) {
        function moduleDeclaration (decl, conf) {
            return moduleDefinition(decl, conf) || moduleSpecifier(decl, conf);
        };
        
        function moduleDefinition (decl, conf) {
            var namedMod = /^module\s+(\w+)\s*\{(.+)\}\s*;?\s*$/,
                match = decl.match(namedMod);
            if (match) {
                conf.name = match[1];
                return moduleBody(match[2].trim(), conf);
            }
            var unnamedMod = /^module\s+\{(.+)\}\s*;?\s*$/,
                match = decl.match(unnamedMod);
            if (match) {
                conf.name = undefined;
                return moduleBody(match[1].trim(), conf);
            }
            return false;
        };
        
        function moduleSpecifier (decl, conf) {
            var re = /^\s*module\s+(\w+)\s+from\s+(['"])?([^\s'"]+)(['"])?\s*;\s*$/,
                match = decl.match(re);
            if (match) {
                conf.modules = conf.modules || {};
                conf.modules[match[1]] = match[3];
                return true;
            }
            return false;
        };
        
        function moduleBody(decl, conf) { // @TODO: BEWARE MULTIPLE DECLARATIONS!!!!
            if (!decl) { return true; }
            var decls = decl.split(';');
            for (var i = 0; i < decls.length, decls[i]; i++) {
                if (!(importDeclaration(decls[i] + ';', conf) || exportDeclaration(decls[i] + ';', conf) || moduleSpecifier(decls[i] + ';', conf))) {
                    return false;
                }
            }
            return true;
        };
        
        function importDeclaration (decl, conf) {
            var importRexp = /^\s*import\s+(.*)$/;
            var match = decl.match(importRexp);
            if (match) {
                return importBindings(match[1], conf);
            }
            return false;
        };
        
        function importBindings(decl, conf) {
            var bindingRE = /^\s*(\w+)\s+from\s+(['"]?)([^\s'"]+)(['"]?)\s*;\s*$/;
            var match = decl.match(bindingRE);
            if (match) {
                conf.import = conf.import || {};
                conf.import[match[1]] = match[3] || match[1];
                return true;
            }
            return false;
        };
        
        function exportDeclaration (decl, conf) {
            var exportRexp = /^\s*export\s+(\w+(\.\w+)*)\s*;\s*$/;
            var match = decl.match(exportRexp);
            if (match) {
                conf.export = conf.export || [];
                conf.export.push(match[1]);
                return true;
            }
            return false;
        };
        
        var moduleObj = conf || {},
            decl = declaration.join('');
        if (!(moduleDeclaration(decl, moduleObj) || exportDeclaration(decl, moduleObj) || importDeclaration(decl, moduleObj))) {
            return 'Not a module declaration: ' + declaration;
        }
        return moduleObj;
    };
    
    //
    // UTILITY FUNCTIONS
    //
    
    /**
     * Loads a module in its own function
     */
    var loadModule = function (text, moduleConf, callback) {
        !moduleConf && (moduleConf = {});
        var returns = moduleConf.export ?
            '{' + moduleConf.export.map(function (v) { return v.substr(v.indexOf('.') + 1) + ':' + v   ; }).join(',') + '}'
            : '';
        var fn = new Function('imports', 'with (imports) {' + text.join('\n') + '; return ' + returns + ';}');
        
        var conf = moduleConf.deps || {};
        if (typeof window !== 'undefined') {
            conf.window = {
               'document': window.document,
               'navigator': window.navigator,
               'location': window.location
            };
        }
        
        var module = fn.apply({}, [conf]);
        if (moduleConf.hasOwnProperty('name')) {
            modules[moduleConf.src] = module;
            moduleConf.name && (modules[moduleConf.name] = module); // Modules are accessible either via their names or their URI             
        } else {
            for (var i in module) {
                if (module.hasOwnProperty(i)) {
                    modules[i] = module[i];
                }
            }
        }
        if (typeof callback == 'function') {
            callback(module);
        }
    };
    
    var applyConfiguration = function (conf, callback, errorFn) {
        var depsPool = (function () {
            var _c = 0;
            for (var i in conf.import) {
                conf.import.hasOwnProperty(i) && _c++;
            }
            for (var i in conf.modules) {
                conf.modules.hasOwnProperty(i) && _c++;
            }
            return function () {
                --_c || (console.log(conf) || callback(conf));
            }
        })();
        
        var importsLoader = function (i) {
            var imported = conf.import[i];
            if (modules[imported]) {
                conf.deps[i] = modules[imported][i];
                depsPool();
            } else {
                _module(
                    imported,
                    function (module) {
                        conf.deps[i] = module[i];
                        depsPool();
                    },
                    errorFn);
            }
        };
        
        var modulesLoader = function (i) {
            var imported = conf.modules[i];
            if (modules[imported]) {
                conf.deps[i] = modules[imported];
                depsPool();
            } else {
                _module(
                    imported,
                    function (module) {
                        conf.deps[i] = module;
                        depsPool();
                    },
                    errorFn);
            }
        };
        
        conf.deps = {};
        for (var i in conf.import) {
            conf.import.hasOwnProperty(i) && importsLoader(i);
        }
        
        for (var i in conf.modules) {
            conf.modules.hasOwnProperty(i) && modulesLoader(i);
        }
        if (!conf.import && !conf.modules) {
            return callback(conf);
        }
    };
    
    /**
     * Retrieves the file corresponding to the module and declares it
     */
    var _module = function (moduleSrc, callback, errorFn) {
        var _error = function (msg) {
            _errModules = _errModules || [];
            _errModules.indexOf(moduleSrc) === -1 && _errModules.push(moduleSrc);
            if (typeof errorFn == 'function') {
                errorFn();
            } else {
                throw new Error(msg);
            }
        };
        reqwest({  //@TODO update with generic AJAX request
            url: moduleSrc,
            type: 'js-module',
            error: function () {
                _error('Unable to fetch the module "' + moduleSrc + '"');
            },
            success: function (res) {
                var moduleConf = {
                    src: moduleSrc
                };
                var text = res.responseText.split('\n');
                var declaration = []
                for (var i = 0; i < text.length; i++) {
                    var cmd = text[i].trim().match(/^\s*"(.*)"\s*;?$/);
                    if (cmd) {
                        declaration.push(cmd[1].trim());
                    } else { // At the first line where we do not find a module-related command, we stop the module evaluation.
                        break;
                    }
                }
                if (declaration.length) {
                    moduleConf = parse(declaration, moduleConf);
                    (typeof moduleConf == 'string') && _error(moduleConf);
                    applyConfiguration(moduleConf, function (parsedConf) {
                        loadModule(text, parsedConf, callback)
                    }, errorFn);
                } else {
                    loadModule(text, moduleConf, callback);
                }
            }
        });
    }
    for (var i = 0; i < document.scripts.length; i++) {
        var script = document.scripts[i];
        if (script.getAttribute('type') === 'text/shepherd-js') {
            var moduleSrc = script.getAttribute('src');
            if (moduleSrc && !modules.hasOwnProperty(moduleSrc)) {
                _module(moduleSrc);
            }
        }
    }
    
    //var _previousValue = me.nh; //Unused for now
    me.nh = function (modulePath, cb) {
        _module(modulePath, cb, _errCb);
    };
    me.nh.get = function (moduleName) {
        return modules[moduleName];
    };
    me.nh.error = function (cb) {
        if (arguments.length === 0) {
            return _errModules;
        }
        _errCb = cb;
    };
    me.nh.reset = function () {
        _errCb = undefined;
        modules = {};
        _errModules = null;
    }
})(this);
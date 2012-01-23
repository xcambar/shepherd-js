/**
 * 
 * Copyright (c) 2012, Xavier Cambar
 * Licensed under the MIT License (see LICENSE for details)
 * 
 * Sources of inspiration (among others)
 * @see http://wiki.ecmascript.org/doku.php?id=harmony:modules for parsing and use case reference
 * @see http://addyosmani.com/writing-modular-js/
 */
(function (me) {
    var undefined = arguments[arguments.length];
    var modules = {},
        _errCb,
        _errModules = null;
    
    //
    // Native plugins
    //
    
    var modularize = function (globalVar) {
        if (!me.hasOwnProperty(globalVar)) {
            return 'No global "' + globalVar + '"';
        }
        modules[globalVar] = me[globalVar];
        return true;
    };
    
    var noGlobal = function (globalVar) {
        if (!me.hasOwnProperty(globalVar)) {
            return 'No global "' + globalVar + '"';
        }
        me[globalVar] = undefined;
        return true;
    };
    
    var _plugins = {
        'modularize': modularize,
        'noGlobal': noGlobal
    };
    
    /**
     * Parses the module declaration and prepares the execution context of the module
     * @param {Array} An array of text of lines. Each line is a fragment of a module declaration
     * @return {Object|String} Returns the module's evaluated execution context or an error string 
     */
    var parse = function (declaration, conf) {
        
        function pluginDeclaration (decl, conf) {
            var plugins = decl.split(';'),
                pluginRe = /^\s*(\w+)\!(\S*)\s*$/;
            for(var i = 0; i < plugins.length; i++) {
                if (!plugins[i]) { continue; }
                var plugin = plugins[i],
                    match = plugin.match(pluginRe);
                if (match) {
                    var pluginName = match[1];
                        argument = match[2];
                    if (!_plugins[pluginName]) {
                        return 'Unknown plugin "' + pluginName + '"';
                    }
                    var pluginResult = _plugins[pluginName](argument);
                    if ((typeof(pluginResult) == 'string' || !pluginResult)) {
                        return pluginResult;
                    }
                } else {
                    return false;
                }
            }
            return true;
        }
        
        function moduleDeclaration (decl, conf) {
            return moduleDefinition(decl, conf) || moduleSpecifier(decl, conf);
        };
        
        function moduleDefinition (decl, conf) {
            var namedMod = /^\s*module\s+(\w+)\s*\{(.+)\}\s*;?\s*$/,
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
            decl = declaration.join(''),
            isPlugin = pluginDeclaration(decl, moduleObj);
        if (typeof isPlugin == 'string') {
            return isPlugin;
        } else if (isPlugin) {
            return moduleObj;
        } else if (!(moduleDeclaration(decl, moduleObj) || exportDeclaration(decl, moduleObj) || importDeclaration(decl, moduleObj))) {
            return 'Not a module declaration: ' + declaration;
        }
        return moduleObj;
    };
    
    //
    // UTILITY FUNCTIONS
    //
    /**
     *  XHR request
     **/
    var xhr = function (o) {
        var http = ('XMLHttpRequest' in me) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        http.open('GET', o.url, true);
        http.setRequestHeader('Accept', 'application/javascript, text/javascript');
        http.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (/^20\d$/.test(this.status)) {
                    o.success && o.success(http);
                    o.complete && o.complete(http);
                } else {
                    o.error && o.error(http);
                    o.complete && o.complete(http);
                }
            }
        };
        http.send();
    };
    
    /**
     * Loads a module in its own function
     */
    var loadModule = function (text, moduleConf, callback) {
        !moduleConf && (moduleConf = {});
        var returns = moduleConf.export ?
            '{' + moduleConf.export.map(function (v) { return v.substr(v.indexOf('.') + 1) + ':' + v; }).join(',') + '}'
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
                --_c || callback(conf);
            }
        })();
        
        var importsLoader = function (name, ref) {
            if (modules[ref]) {
                conf.deps[name] = modules[ref][i];
                depsPool();
            } else {
                _module(
                    ref || name,
                    function (module) {
                        conf.deps[name] = module[name || ref];
                        depsPool();
                    },
                    errorFn);
            }
        };
        
        var modulesLoader = function (name, ref) {
            if (modules[ref]) {
                conf.deps[name] = modules[ref];
                depsPool();
            } else {
                _module(
                    ref || name,
                    function (module) {
                        conf.deps[name] = module;
                        depsPool();
                    },
                    errorFn);
            }
        };
        
        conf.deps = {};
        for (var i in conf.import) {
            conf.import.hasOwnProperty(i) && importsLoader(i, conf.import[i]);
        }
        
        for (var i in conf.modules) {
            conf.modules.hasOwnProperty(i) && modulesLoader(i, conf.modules[i]);
        }
        if (!conf.import && !conf.modules) {
            return callback(conf);
        }
    };
    
    var _moduleSrc = function(src, callback, errorFn, conf) {
        var moduleConf = conf || {},
            callback = callback || function () {},
            errorFn = errorFn || function () {},
            text = src.split('\n'),
            declaration = []
        for (var i = 0; i < text.length; i++) {
            var cmd = text[i].trim();
            if (!cmd) { continue; }
            var match = cmd.match(/^\s*"(.*)"\s*;?$/);
            if (match) {
                declaration.push(match[1].trim());
            } else { // At the first line where we do not find a module-related command, we stop the module evaluation.
                break;
            }
        }
        if (declaration.length) {
            moduleConf = parse(declaration, moduleConf);
            (typeof moduleConf == 'string') && errorFn(moduleConf);
            applyConfiguration(moduleConf, function (parsedConf) {
                loadModule(text, parsedConf, callback)
            }, errorFn.origFn);
        } else {
            loadModule(text, moduleConf, callback);
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
        _error.origFn = errorFn;
        
        xhr({ url: moduleSrc,
            error: function () {
                _error('Unable to fetch the module "' + moduleSrc + '"');
            },
            success: function (res) {
                var responseText = res.responseText;
                _moduleSrc(responseText, callback, _error, { src: moduleSrc});
            }
        });
    }
    
    //<script> tag evaluation
    me.addEventListener && me.addEventListener('load', function () {
        for (var i = 0; i < document.scripts.length; i++) {
            var script = document.scripts[i];
            if (script.getAttribute('type') === 'text/shepherd-js') {
                var moduleSrc = script.getAttribute('data-src');
                moduleSrc && !modules.hasOwnProperty(moduleSrc) && _module(moduleSrc);
                !moduleSrc && script.innerHTML && _moduleSrc(script.innerHTML);
            }
        }
    });
    
    me.s6d = function (modulePath, cb) {
        _module(modulePath, cb, _errCb);
    };
    me.s6d.src = function (moduleSrc, cb) {
        _module(moduleSrc, cb, _errCb);
    };
    me.s6d.get = function (moduleName) {
        return modules[moduleName];
    };
    me.s6d.error = function (cb) {
        if (arguments.length === 0) {
            return _errModules;
        }
        _errCb = cb;
    };
    me.s6d.reset = function () {
        _errCb = undefined;
        modules = {};
        _errModules = null;
    }
})(this);
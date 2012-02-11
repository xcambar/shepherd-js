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
        _errModules = null,
        _isServer = typeof window == 'undefined';
    
    //
    // Native plugins
    //
    var _plugins = {
        'modularize': function (globalVar) {
            if (!me.hasOwnProperty(globalVar)) {
                return 'No global "' + globalVar + '"';
            }
            modules[globalVar] = me[globalVar];
            return true;
        },
        'noGlobal': function (globalVar) {
            if (!me.hasOwnProperty(globalVar)) {
                return 'No global "' + globalVar + '"';
            }
            me[globalVar] = undefined;
            return true;
        }
    };
    
    // 
    // Wrappers for commonJS and AMD loaders
    // 
    var _loaderWrappers = function (conf) {
        var name = conf.format;
        if (name === 'commonJS') {
            /**
             * The call to require(arg) ternary operator makes the loader non strict, but is used for convenience
             */
            return {
                fn: function (arg) {
                    return (conf.deps && conf.deps.hasOwnProperty(arg)) ? conf.deps[arg] : require(arg);
                },
                name: 'require'
            };
        } else if (name === 'amd') {
            var wrapperFn = function (name, deps, factory) {
                var _n, _d, _f;
                switch (arguments.length) {
                    case 1:
                        _f = name;
                        break;
                    case 2:
                        _d = name, _f = deps;
                        break;
                    default:
                        _n = name, _d = deps, _f = factory;
                }
                if (_d) {
                    var deps = {};
                    for (var i = 0, _l = _d.length; i < _l; i++) {
                        deps[_d[i]] = _d[i];
                    }
                    _d = deps;
                }
                var modConf = {};
                _d && (modConf.import = _d);
                _n && (modConf.name = _n);
                _f && (modConf.fn = _f);

                applyConfiguration(modConf, function (parsedConf) {
                    loadModule(parsedConf, callback);
                });
            };
            var wrapperName = 'define';
            return {
                fn: wrapperFn,
                name: wrapperName
            };            
        }
    };
    
    // 
    // 
    // Module declaration parser
    // 
    // 
    
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
                if (match[2] && match[4] && (match[2] === match[4])) {
                    conf.modulesByURI = conf.modulesByURI || {};
                    conf.modulesByURI[match[1]] = match[3];
                } else if (!match[2] && !match[4]) {
                    conf.modules = conf.modules || {};
                    conf.modules[match[1]] = match[3];
                }
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
            var importRexp = /^\s*((\w*)\!)?import\s+(.*)$/;
            var match = decl.match(importRexp);
            if (match) {
                return importBindings(match[3], conf, match[2]);
            }
            return false;
        };
        
        function importBindings(decl, conf, format) {
            var bindingRE = /^\s*(\w+)\s+from\s+(['"]?)([^\s'"]+)(['"]?)\s*;\s*$/;
            var match = decl.match(bindingRE);
            if (match) {
                conf.import = conf.import || {};
                conf.import[match[1]] = {ref: match[3] || match[1], format: format};
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
     * Loads a module in its own wrapper function
     * The module is ocnsideref as fully loaded, dependencies included.
     * When using a loader wrapper, we are out of this scope, as dependencies are likely yet to be loaded.
     * The interface must be updated to reflect the need of one more level of async.
     * @TODO Change the process when using AMD (current example)
     */
    var loadModule = function (moduleConf, callback) {
        !moduleConf && (moduleConf = {});
        var conf = moduleConf.deps || {};
        var module;
        if (!_isServer) {
            conf.window = {
               'document': window.document,
               'navigator': window.navigator,
               'location': window.location
            };
            var returns = moduleConf.export ?
                '{' + moduleConf.export.map(function (v) { return v.substr(v.indexOf('.') + 1) + ':' + v; }).join(',') + '}'
                : '{}';
            var arguments = [conf];
            var argsName = ['imports'];
            if (moduleConf.format && moduleConf.format.length) {
                var wrapperConf = _loaderWrappers(moduleConf);
                arguments.push(wrapperConf.fn);
                argsName.push(wrapperConf.name);
            }
            var fn = Function.apply({}, argsName.concat([['with (imports) {', moduleConf.contents, 'return ' + returns, '}'].join('\n')]));
            module = fn.apply({}, arguments);
        } else {
            var vm = require('vm');
            var context = conf;
            if (moduleConf.format && moduleConf.format.length) {
                var wrapperConf = _loaderWrappers(moduleConf);
                context[wrapperConf.name] = wrapperConf.fn;
            }
            context.returns = {};
            context.console = console;
            var returnStatement = moduleConf.export ? moduleConf.export.map(function (v) {return 'returns.' + v + ' = ' + v}).join(';\n') : '';
            vm.runInNewContext(moduleConf.contents + ';\n' + returnStatement, context, moduleConf.src + '.vm');
            module = context.returns;
        }
        moduleConf.src && (modules[moduleConf.src] = module);
        if (moduleConf.hasOwnProperty('name')) {
            moduleConf.name && (modules[moduleConf.name] = module); // Modules are accessible either via their name or their URI             
        } else {
            for (var i in module) {
                if (module.hasOwnProperty(i)) {
                    modules[i] = module[i];
                }
            }
        }
        if (typeof callback == 'function') {
            callback(module || {} );
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
            for (var i in conf.modulesByURI) {
                conf.modulesByURI.hasOwnProperty(i) && _c++;
            }
            return function () {
                !--_c && callback(conf);
            }
        })();
        
        var importsLoader = function (name, ref) {
            if (modules[ref.ref]) {
                conf.deps[name] = modules[ref.ref][i];
                depsPool();
            } else {
                _module(
                    {name: ref.ref || name, format: ref.format},
                    function (module) {
                        conf.deps[name] = module[name || ref.ref];
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
        
        var modulesLoaderByRef = function (name, ref) {
            var mod = modules[ref];
            if (!mod) {
                if (_isServer) {
                    mod = modules[ref] = require(ref);
                } else {
                    throw new Error(e); //@TODO Plugin idea => browser-side auto loader by module name
                }
            }    
            conf.deps[name] = mod;
            depsPool();
        };
        
        conf.deps = {};
        for (var i in conf.import) {
            conf.import.hasOwnProperty(i) && importsLoader(i, conf.import[i]);
        }
        
        for (var i in conf.modules) {
            conf.modules.hasOwnProperty(i) && modulesLoaderByRef(i, conf.modules[i]);
        }
        
        for (var i in conf.modulesByURI) {
            conf.modulesByURI.hasOwnProperty(i) && modulesLoader(i, conf.modulesByURI[i]);
        }
        
        if (!conf.import && !conf.modules && !conf.modulesByURI) {
            return callback(conf);
        }
    };
    
    var _moduleSrc = function(conf, callback, errorFn) {
        var moduleConf = conf || {},
            callback = callback || function () {},
            errorFn = errorFn || function () {},
            text = conf.contents ? conf.contents.split('\n') : [],
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
                loadModule(parsedConf, callback);
            }, errorFn.origFn);
        } else {
            loadModule(moduleConf, callback);
        }
    };
    
    //Path detection follows 3 steps
    // * resolution by require (ie, let Node try to do the job) in case it is a native module or a Node module
    // * "natural" path resolution (ie, let Node try to do the job)
    // * test the path from the location of shepherd.js
    // * test the path from the current working directory (via process.cwd())
    var _serverPathDetection = function (uri) {
        var path;
        try {
            path =  !path ? require.resolve(uri) : path;
        } catch (e) { /** Nothing here **/ }
        try {
            path =  !path ? require('fs').statSync(__dirname + '/' + uri).isFile() && (__dirname + '/' + uri) : path;
        } catch (e) { /** Nothing here **/ }
        try {
            path =  !path ? require('fs').statSync(process.cwd() + '/' + uri).isFile() && process.cwd() + '/' + uri : path;
        } catch (e) { /** Nothing here **/ }
        return path;
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
                console.log('Error with: ', moduleSrc, msg);
                throw new Error(msg);
            }
        };
        _error.origFn = errorFn;
        var moduleConf = (typeof moduleSrc != 'string') ? moduleSrc : {src: moduleSrc};
        !moduleConf.format && _isServer && (moduleConf.format = 'commonJS');
        var uri = (typeof moduleSrc == 'string') ? moduleSrc : moduleSrc.name;
        if (uri) {
            !_isServer && xhr({ url: uri,
                error: function () {
                    _error('Unable to fetch the module "' + moduleSrc + '"');
                },
                success: function (res) {
                    var responseText = res.responseText;
                    moduleConf.contents = responseText;
                    _moduleSrc(moduleConf, callback, _error);
                }
            });
            if (_isServer) {
                var modPath, url = require('url'), parsedURL = url.parse(uri);
                if(parsedURL.host) {
                    var get = require(parsedURL.protocol.indexOf('https') !== -1 ? 'https' : 'http').get;
                    var newURL = {host: parsedURL.host, path: parsedURL.pathname};
                    parsedURL.port && (newURL.port = parsedURL.port);
                    get(newURL, function (res) {
                        var data = '';
                        res.on('data', function (chunk) {
                            data += chunk;
                        });
                        res.on('end', function () {
                            moduleConf.contents = data;
                            _moduleSrc(moduleConf, callback, _error);
                        });
                        res.on('error', _error);
                    });
                } else {
                    var modPath = _serverPathDetection(uri);
                    if (!modPath) {
                        _error('Unable to locate file ' + uri);
                        return;
                    } else if (typeof modPath == 'object') { //@TODO Check
                        moduleConf.deps = moduleConf.deps || {};
                        moduleConf.deps[modPath.uri] = modPath.node_module;
                    } else {
                        try {
                            moduleConf.contents = require('fs').readFileSync(modPath, 'utf-8');
                        } catch (e) {
                            _error(e.message);
                            return;
                        }
                    }
                    _moduleSrc(moduleConf, callback, _error);
                }
            }
        } else {
            (typeof moduleSrc == 'object') && _moduleSrc(moduleSrc, callback, _error);
        }
    };
    
    //<script> tag evaluation
    !_isServer && me.addEventListener && me.addEventListener('load', function () {
        for (var i = 0; i < document.scripts.length; i++) {
            var script = document.scripts[i];
            if (script.getAttribute('type') === 'text/shepherd-js') {
                var moduleSrc = script.getAttribute('data-src');
                moduleSrc && !modules.hasOwnProperty(moduleSrc) && _module(moduleSrc);
                !moduleSrc && script.innerHTML && _moduleSrc({contents: script.innerHTML});
            }
        }
    });
    
    me.s6d = function (modulePath, cb) {
        _module(modulePath, cb, _errCb);
    };
    me.s6d.src = function (moduleSrc, cb) {
        _moduleSrc({contents: moduleSrc}, cb, _errCb);
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
    if (_isServer) {
        exports = module.exports = me.s6d;
    }
})(this);
/**
 *
 * Copyright (c) 2012, Xavier Cambar
 * Licensed under the MIT License (see LICENSE for details)
 *
 * Sources of inspiration (among others)
 * @see http://wiki.ecmascript.org/doku.php?id=harmony:modules for parsing and use case reference
 * @see http://addyosmani.com/writing-modular-js/
 */
(function (me, parser, when, undefined) {
    if (typeof parser.parse !== 'function') {
        throw 'No parser provided.';
    }
    function is (obj, type) { //Thanks Underscore ;)
        return Object.prototype.toString.call(obj).toLowerCase() == '[object ' + type.toLowerCase() + ']';
    }
    var modules = {},
        _errModules = null,
        _isServer = typeof window == 'undefined',
        _extDepsCount = 0,
        _debug;
    
    //
    // Native plugins
    //
    var _plugins = {
        'modularize': function modularizePlugin (vars) {
            function fn (globalVar) {
                if (!me.hasOwnProperty(globalVar)) {
                    return 'No global "' + globalVar + '"';
                }
                modules[globalVar] = me[globalVar];
                return true;
            }
            if (is(vars, 'array')) {
                for (var i = 0; i < vars.length; i++) {
                    fn(vars[i]);
                }
            } else {
                fn(vars);
            }
        },
        'noGlobal': function noGlobalPlugin (vars) {
            var fn = function (globalVar) {
                if (!me.hasOwnProperty(globalVar)) {
                    return 'No global "' + globalVar + '"';
                }
                delete me[globalVar];
                return true;
            };
            if (is(vars, 'array')) {
                for (var i = 0; i < vars.length; i++) {
                    fn(vars[i]);
                }
            } else {
                fn(vars);
            }
        }
    };
    
    //
    // Wrappers for commonJS and AMD loaders
    //
    function _loaderWrappers (conf) {
        var name = conf.format;
        if (name === 'commonJS') {
            /**
             * The call to require(arg) ternary operator makes the loader non strict, but is used for convenience
             */
            return {
                fn: function commonJSWrapper (arg) {
                    return (conf.deps && conf.deps.hasOwnProperty(arg)) ? conf.deps[arg] : require(arg);
                },
                name: 'require'
            };
        } else if (name === 'amd') {
            /**
             * Wraps the AMD's define function
             */
            var wrapperName = 'define';
            return {
                name: wrapperName,
                fn: function wrapperFn (name, deps, factory) {
                    var _n, _d, _f;
                    switch (arguments.length) {
                        case 1:
                            _n = conf.name;
                            _f = name;
                            break;
                        case 2:
                            _d = name;
                             _f = deps;
                            break;
                        default:
                            _n = name;
                            _d = deps;
                            _f = factory;
                    }
                    if (_d) {
                        var newDeps = {};
                        for (var i = 0, _l = _d.length; i < _l; i++) {
                            newDeps[_d[i]] = {format: 'amd', ref: _d[i]};
                        }
                        _d = newDeps;
                    }
                    var modConf = {};
                    _d && (modConf.import = _d);
                    _n && (modConf.name = _n);
                    _f && (modConf.fn = _f);
                    modConf.src = conf.src;
                    applyConfiguration(modConf, function applyCallback (parsedConf) {
                        throw new Error('AMD not handled yet');
                        loadModule(parsedConf);
                    });
                }
            };
        }
    }
    
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
    function parse (declaration, conf) {
        function pluginDeclaration (decl) {
            var plugins = decl.split(';'),
                pluginRe = /^\s*([a-zA-Z_$][0-9a-zA-Z_$]*)\!([a-zA-Z_$][0-9a-zA-Z_$]*)\s*$/;
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
                    if (is(pluginResult, 'string') || !pluginResult) {
                        return pluginResult;
                    }
                } else {
                    return false;
                }
            }
            return true;
        }
        var moduleObj = conf || {},
            isPlugin = pluginDeclaration(declaration);
        
        if (is(isPlugin, 'string')) {
            return isPlugin;
        } else if (isPlugin) {
            return moduleObj;
        }
        try {
            var module = parser.parse(declaration);
            if (typeof MINIFY == 'undefined') {
                console.log(module);
            }
            return module;
        } catch (e) {
            return 'Invalid declaration \n' + e.message + '\nDeclaration: ' + declaration;
        }
    }
    
    //
    // UTILITY FUNCTIONS
    //
    
    
    /**
     *  XHR request
     **/
    function xhr (url) {
        var deferred = when.defer(),
            http = ('XMLHttpRequest' in me) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        http.open('GET', url, true);
        http.setRequestHeader('Accept', 'application/javascript, text/javascript');
        http.onreadystatechange = function onReadyStateChange () {
            if (this.readyState == 4) {
                if (/^20\d$/.test(this.status)) {
                    deferred.resolve(http);
                } else {
                    deferred.reject(this.status);
                }
            }
        };
        http.send();
        return deferred.promise;
    }
    
    /**
     * This function is in charge of setting all the modules exports in the memory.
     * @param {Object} module the return vslua of the wrapper function. Contains all the values exported by the module
     * @param {Object} moduleConf The result of the parsing of the module configuration
     * @param {Function} callback The callback function to be called after the successful export
     */
    function _handleExports (module, moduleConf) {
        moduleConf._internals.src && (modules[moduleConf._internals.src] = module);
        moduleConf.name && (modules[moduleConf.name] = module); // Modules are accessible either via their name or their URI
    }
    
    function loadClientSideModule (moduleConf, contents) {
        var conf = moduleConf.imports || {};
        var module;
        var wrapperConf;
        conf.window = {};
        for (var i in window) {
            conf.window[i] = window[i];
        }
        var returns = moduleConf.exports ?
            '{' + moduleConf.exports.map(function (v) { return v.dest + ':(' + ['window.' + v.src, 'this.' + v.src, v.src].join('||') + ')'; }).join(',') + '}'
            : '{}';
        var moduleArgs = [];
        var argsName = [];
        for (var i in conf) {
            if (conf.hasOwnProperty(i)) {
                argsName.push(i);
                moduleArgs.push(conf[i]);
            }
        }
        //@TODO Here's the wrapper part for client-side plugins
        if (moduleConf.format && moduleConf.format.length) {
            wrapperConf = _loaderWrappers(moduleConf);
            argsName.push(wrapperConf.name);
            moduleArgs.push(wrapperConf.fn);
        }
        if (_debug) {
            var script = document.createElement('script'),
                head = document.getElementsByTagName('head')[0];
            script.type = 'text/javascript';
            var extDepIndex = _extDepsCount++;
            script.innerHTML = '(function runner (' + argsName.join(', ') + ') {\n' + contents + '\n;s6d[' + extDepIndex + '](' + returns + ');\n}).apply({}, s6d[' + extDepIndex + ']())';
            moduleConf.src && script.setAttribute('data-src', moduleConf.src);
            moduleConf.name && script.setAttribute('name', moduleConf.name);
            me.s6d[extDepIndex] = function (exports) {
                if (exports) {
                    delete me.s6d[extDepIndex];
                    var defer = when.defer();
                    _handleExports(module, moduleConf, function (module) {
                        defer.resolve(module);
                        return module;
                    });
                    return defer.promise;
                }
                return moduleArgs;
            };
            head.appendChild(script);
        } else {
            var fn;
            if (contents.apply && contents.call) {
                fn = contents;
            } else {
                fn = Function.apply({}, argsName.concat([contents +  ';\nreturn ' + returns]));
            }
            module = fn.apply({}, moduleArgs);
            _handleExports(module, moduleConf);
            return module;
        }
    }

    function loadServerSideModule (moduleConf, contents, callback) {
        var module;
        var wrapperConf;
        var vm = require('vm');
        var context = moduleConf.imports || {};
        if (moduleConf.format && moduleConf.format.length) {
            wrapperConf = _loaderWrappers(moduleConf);
            context[wrapperConf.name] = wrapperConf.fn;
        }
        context.returns = {};
        context.console = console;
        context.exports = {};
        context.module = {exports: {}};
        context.require = function (arg) {
            if (context[arg]) {
                return context[arg];
            }
            return require(arg);
        };
        var returnStatement = moduleConf.exports ? moduleConf.exports.map(function (v) {return 'returns.' + v.dest + ' = ' + v.src}).join(';\n') : '';
        vm.runInNewContext(contents + ';\n' + returnStatement, context, moduleConf._internals.src + '.vm');
        module = context.returns;
        
        /**
         * Automatically exports properties from exports and module.exports
         * I am really not sure this is a good idea, although it eases adoption...
         **/
        for (var i in context.exports) {
            if (context.exports.hasOwnProperty(i)) {
                module[i] = context.exports[i];
            }
        }
        for (var i in context.module.exports) {
            if (context.module.exports.hasOwnProperty(i)) {
                module[i] = context.module.exports[i];
            }
        }
        var defer = when.defer();
        _handleExports(module, moduleConf, function () {
            defer.resolve();
        });
        return defer;
    }

    /**
     * Loads a module in its own wrapper function
     * The module is ocnsideref as fully loaded, dependencies included.
     * When using a loader wrapper, we are out of this scope, as dependencies are likely yet to be loaded.
     * The interface must be updated to reflect the need of one more level of async.
     * @TODO Change the process when using AMD (current example)
     * @param {Object} moduleConf The module configuration
     * @param {String|Function} contents The function or its contents to be run
     * @param {Function} callback A function to be executed afterwards, in case of success
     */
    function loadModule (moduleConf, contents) {
        !moduleConf && (moduleConf = {});
        if (!_isServer) {
            return loadClientSideModule(moduleConf, contents);
        } else {
            loadServerSideModule(moduleConf, contents, callback);
        }
    }
    
    /**
     * Turns the configuration of the module into an actual module. Recursively loads and applies dependencies
     * @param {Object} conf The configuration generated by the parser
     * @param {Function} callback A function to be called after the loading is complete
     * @param {Function} errorFn error callback
     */
    function applyConfiguration (conf) {
        var moduleConf = {};
        var confPromises = [];

        moduleConf._internals = conf._internals;

        function importLoader (declaration) {
            moduleConf.imports = moduleConf.imports || {};
            var _dep = modules[declaration.from.path];
            if (_dep) {
                if (when.isPromise(_dep)) {
                    _dep.then(function (module) {
                            moduleConf.imports[_importName] = module;
                        });
                    confPromises.push(_dep);
                } else {
                    for (var i = 0, _l = declaration.vars.length; i < _l; i++) {
                        var _importName = declaration.vars[i];
                        moduleConf.imports[_importName] = _dep[_importName];
                    }
                }
            } else {
                var _p = _module(
                    declaration.from.path,
                    function (module) {
                        for (var i = 0, _l = declaration.vars.length; i < _l; i++) {
                            var _importName = declaration.vars[i];
                            moduleConf.imports[_importName] = module[_importName];
                        }
                    }
                );
                confPromises.push(_p);
            }

        }

        function exportLoader (declaration) { //@TODO Handle export renaming
            for (var i = 0, _l = declaration.length; i < _l; i++) {
                moduleConf.exports = moduleConf.exports || [];
                moduleConf.exports.push({src: declaration[i], dest: declaration[i]});
            }
        }

        function moduleLoader (declaration) {
            //@TODO Make sure of the availability of the module, if it is loadING and not loaded
            // if (modules.hasOwnProperty(declaration.id)) { //Module has already been declared
            //     return;
            // }
            // modules[declaration.id] = undefined;
            moduleConf.name = conf.decl.id;
            if (declaration.expressions) {
                for (var i = 0, _l = declaration.expressions.length; i < _l; i++) {
                    var expr = declaration.expressions[i];
                    if (expr.type === 'export') {
                        exportLoader(expr.decl);
                    } else if (expr.type === 'import') {
                        importLoader(expr.decl);
                    } else if (expr.type === 'module') {
                        moduleLoader(expr.decl);
                    }
                }
            } else { //This is a module reference
                moduleConf.imports = moduleConf.imports || {};
                var ref = declaration.path || declaration.src || declaration.id;
                var _mod = modules[ref];
                

                //@FIX WTF means this if/else ???????
                if (_mod) { //The module has already been loaded
                    if (when.isPromise(_mod)) {
                        _mod.then(function (module) {
                            moduleConf.imports[declaration.id] = module;
                            return module;
                        });
                        confPromises.push(_mod);
                    } else {
                        moduleConf.imports[declaration.id] = _mod;
                    }
                } else if (declaration.path) {
                    var _p = _module(
                        declaration.path,
                        function (module) {
                            moduleConf.imports[declaration.id] = module;
                            return moduleConf;
                        }
                    );
                    confPromises.push(_p);
                } else {
                    if (_isServer) {
                        var _dep;
                        try {
                            _dep = require(declaration.src);
                        } catch (e) {
                            throw new Error('The required module %1 doesn\'t exist'.replace('%1', declaration.src));
                        }
                        moduleConf.imports[declaration.id] = _dep;
                    } else {
                        throw new Error('The required module %1 doesn\'t exist'.replace('%1', declaration.src));
                    }
                }
            }
        }

        if (conf.type === 'module') {
            moduleConf.name = conf.decl.id;
            moduleLoader(conf.decl);
        } else if (conf.type === 'export') {
            exportLoader(conf.decl);
        } else if (conf.type === 'import') {
            importLoader(conf.decl);
        }
        var defer = when.all(confPromises).then(
            function () {
                return moduleConf;
            }, function () {
                throw new Error('Error while loading ' + moduleConf._internals.src);
            }
        );
        return defer;
    }
    
    function _moduleSrc (conf) {
        var defer = when.defer();
            moduleConf = conf || {},
            rawText = conf.contents ? conf.contents : '',
            declaration = '';
        var comments = rawText.match(/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg); //@TODO Fix: Doesn't handle single line commments (see libs/jquery-1.7.2.min.js)
        if (!comments) {
            var module = loadModule({_internals: {src: conf.src}}, rawText)
            return defer.resolve(module);
        }
        // @TODO Enhance: Only a single declaration is allowed per file, as the first comment
        var split = comments[0].split("\n");
        for (var j = 0, _l2 = split.length; j < _l2; j++) {
            declaration += split[j].trim().replace(/(^\/\*+)|(\*+\/?)/, '');
        }
        if (declaration.length) {
            moduleConf = parse(declaration, moduleConf);
            if (is(moduleConf, 'string')) {
                defer.reject(moduleConf);
            } else {
                //@TODO Allow multiple declarations
                var usedConf = moduleConf[0];
                usedConf._internals = {src: conf.src, contents: rawText};
                when(applyConfiguration(usedConf)).then(
                    function (moduleConf) {
                        return moduleConf;
                    },
                    function (e) {
                        defer.reject(e);
                    }
                ).then(function (moduleConf) {
                    var module = loadModule(moduleConf, moduleConf._internals.contents);
                    defer.resolve(module);
                    return module;
                });
            }
        } else {
            var module = loadModule({_internals: {src: conf.src}}, rawText);
            defer.resolve(module);
            return module;
        }
        return defer.promise;
    }
    
    //Path detection follows 3 steps
    // * resolution by require (ie, let Node try to do the job) in case it is a native module or a Node module
    // * "natural" path resolution (ie, let Node try to do the job)
    // * test the path from the location of shepherd.js
    // * test the path from the current working directory (via process.cwd())
    function _serverPathDetection (uri) {
        var path;
        try {
            path =  require.resolve(uri);
        } catch (e) { /** Nothing here **/ }
        try {
            path =  !path ? require('fs').statSync(__dirname + '/' + uri).isFile() && (__dirname + '/' + uri) : path;
        } catch (e) { /** Nothing here **/ }
        try {
            path =  !path ? require('fs').statSync(process.cwd() + '/' + uri).isFile() && process.cwd() + '/' + uri : path;
        } catch (e) { /** Nothing here **/ }
        return path;
    }
    
    /**
     * Retrieves the file corresponding to the module and declares it
     * @return A promise
     */
    function _module (moduleSrc, callback, errorFn) {
        if (modules.hasOwnProperty(moduleSrc)) {
            return callback(modules[moduleSrc]);
        }
        function _error (msg) {
            _errModules = _errModules || [];
            _errModules.indexOf(moduleSrc) === -1 && _errModules.push(moduleSrc);
            if (is(errorFn, 'function')) {
                errorFn();
            } else {
                throw new Error( '(' + moduleSrc + ') ' + msg);
            }
        }
        _error.origFn = errorFn;
        
        var modulePromise = when.defer();
        modulePromise.then(callback, _error);
        
        var moduleConf = is(moduleSrc, 'string') ?  {src: moduleSrc} : moduleSrc;
        !moduleConf.format && _isServer && (moduleConf.format = 'commonJS');
        var uri = is(moduleSrc, 'string') ? moduleSrc : moduleSrc.name;
        if (uri) {
            if (!_isServer) {
                when(xhr(uri))
                .then(
                    function xhrSuccess (res) {
                        var responseText = res.responseText;
                        moduleConf.contents = responseText;
                        when(_moduleSrc(moduleConf)).then(
                            function (conf) {
                                modulePromise.resolve(conf);
                                return conf;
                            }, function (msg) {
                                modulePromise.reject(msg);
                            }
                        );
                    },
                    function xhrError (code) {
                        _error('Unable to fetch the module "' + moduleSrc + '" (status code: ' + code + ')');
                    }
                );
                return modulePromise.promise;
            } else {
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
                    modPath = _serverPathDetection(uri);
                    if (!modPath) {
                        _error('Unable to locate file ' + uri);
                        return;
                    } else if (is(modPath, 'object')) { //@TODO Check
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
            if (is(moduleSrc, 'object')) {
                _moduleSrc(moduleSrc, function (conf) {
                    modulePromise.resolve(conf);
                    return conf;
                }, function (msg) {
                    modulePromise.reject(msg);
                });
            }
            return modulePromise;
        }
    }
    
    /**
     * Parses the configuration objects
     */
    function initConfig (confs) {
        for (var i = 0; i < confs.length; i++) {
            var confStr = confs[i];
            var conf;
            if (is(JSON, 'object')) {
                conf = JSON.parse(confStr);
            } else {
                var confFn = new Function ('return ' + confStr);
                conf = confFn();
            }
            for (var prop in conf) {
                if (!conf.hasOwnProperty(prop)) { continue; }
                if (prop in _plugins) {
                    _plugins[prop](conf[prop]);
                } else if (prop == 'debug') {
                    _debug = conf[prop];
                }
            }
        }
    }
    /**
     * Runs through the modules' definition and loads them
     **/
    function initModules (modules) {
        for (var i = 0; i < modules.length; i++) {
            var module = modules[i];
            var moduleSrc = module.getAttribute('data-src');
            moduleSrc && !modules.hasOwnProperty(moduleSrc) && _module(moduleSrc);
            !moduleSrc && module.innerHTML && _moduleSrc({contents: module.innerHTML});
        }
    }
    
    //<script> tag evaluation
    !_isServer && me.addEventListener && me.addEventListener('load', function onReady () {
        var confs = [];
        var modules = [];
        for (var i = 0; i < document.scripts.length; i++) {
            var script = document.scripts[i],
                srcAttr = script.getAttribute('type');
            if (srcAttr == "text/shepherd-js") {
                modules.push(script);
            } else if (srcAttr == "text/shepherd-js/config") {
                confs.push(script.innerHTML.trim());
            }
        }
        initConfig(confs);
        initModules(modules);
    });
    
    if (typeof MINIFY == 'undefined') { // MINIFY is set by uglifyJS, the following code is absent from the minified build
        var _errCb;
        me.s6d = function (modulePath, cb) {
            if (is(modulePath, 'object')) {
                initConfig([modulePath]);
            } else {
                _module(modulePath, cb, _errCb);
            }
        };
        me.s6d.src = function (moduleSrc, cb) {
            _moduleSrc({contents: moduleSrc}, cb, _errCb);
        };
        me.s6d.get = function (moduleName) {
            if (moduleName) {
                return modules[moduleName];
            } else {
                return modules;
            }
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
        };
        if (_isServer) {
            exports = module.exports = me.s6d;
        }
    }
})(this, harmonyParser, when);

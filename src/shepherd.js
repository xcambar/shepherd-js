/**
 *
 * Copyright (c) 2012, Xavier Cambar
 * Licensed under the MIT License (see LICENSE for details)
 *
 * Sources of inspiration (among others)
 * @see http://wiki.ecmascript.org/doku.php?id=harmony:modules for parsing and use case reference
 * @see http://addyosmani.com/writing-modular-js/
 */
(function (me, parser) {
    if (typeof parser.parse !== 'function') {
        throw'No parser provided.';
    }
    function is (obj, type) { //Thanks Underscore ;)
        return Object.prototype.toString.call(obj).toLowerCase() == '[object ' + type.toLowerCase() + ']';
    }
    var undefined = arguments[arguments.length];
    var modules = {},
        _errCb,
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
        function pluginDeclaration (decl, conf) {
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
            isPlugin = pluginDeclaration(declaration, moduleObj);
        
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
    function xhr (o) {
        var http = ('XMLHttpRequest' in me) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        http.open('GET', o.url, true);
        http.setRequestHeader('Accept', 'application/javascript, text/javascript');
        http.onreadystatechange = function onReadyStateChange () {
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
    }
    
    /**
     * This function is in charge of setting all the modules exports in the memory.
     * @param {Object} module the return vslua of the wrapper function. Contains all the values exported by the module
     * @param {Object} moduleConf The result of the parsing of the module configuration
     * @param {Function} callback The callback function to be called after the successful export
     */
    function _handleExports (module, moduleConf, callback) {
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
        if (is(callback, 'function')) {
            callback(module || {} );
        }
    }
    
    /**
     * Loads a module in its own wrapper function
     * The module is ocnsideref as fully loaded, dependencies included.
     * When using a loader wrapper, we are out of this scope, as dependencies are likely yet to be loaded.
     * The interface must be updated to reflect the need of one more level of async.
     * @TODO Change the process when using AMD (current example)
     */
    function loadModule (moduleConf, callback) {
        !moduleConf && (moduleConf = {});
        var conf = moduleConf.deps || {};
        var module;
        var wrapperConf;
        if (!_isServer) {
            conf.window = {
               'document': window.document,
               'navigator': window.navigator,
               'location': window.location
            };
            var returns = moduleConf.export ?
                '{' + moduleConf.export.map(function (v) { return v.dest + ':' + v.src; }).join(',') + '}'
                : '{}';
            var moduleArgs = [];
            var argsName = [];
            for (var i in conf) {
                if (conf.hasOwnProperty(i)) {
                    argsName.push(i);
                    moduleArgs.push(conf[i]);
                }
            }
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
                script.innerHTML = '(function runner (' + argsName.join(', ') + ') {\n' + moduleConf.contents + '\n;s6d[' + extDepIndex + '](' + returns + ');\n}).apply({}, s6d[' + extDepIndex + ']())';
                moduleConf.src && script.setAttribute('data-src', moduleConf.src);
                moduleConf.name && script.setAttribute('name', moduleConf.name);
                me.s6d[extDepIndex] = function (exports) {
                    if (exports) {
                        delete me.s6d[extDepIndex];
                        _handleExports(exports, moduleConf, callback);
                        return;
                    }
                    return moduleArgs;
                };
                head.appendChild(script);
            } else {
                var fn = moduleConf.fn || Function.apply({}, argsName.concat([moduleConf.contents +  ';\nreturn ' + returns]));
                module = fn.apply({}, moduleArgs);
                _handleExports(module, moduleConf, callback);
            }
        } else {
            var vm = require('vm');
            var context = conf;
            if (moduleConf.format && moduleConf.format.length) {
                wrapperConf = _loaderWrappers(moduleConf);
                context[wrapperConf.name] = wrapperConf.fn;
            }
            context.returns = {};
            context.console = console;
            context.exports = {};
            context.module = {exports: {}};
            var returnStatement = moduleConf.export ? moduleConf.export.map(function (v) {return 'returns.' + v.dest + ' = ' + v.src}).join(';\n') : '';
            vm.runInNewContext(moduleConf.contents + ';\n' + returnStatement, context, moduleConf.src + '.vm');
            module = context.returns;
            
            /**
             * Automatically exports properties from exports and module.exports
             * I am really not sure this is a good idea, although it eases adoption...
             **/
            for (var i in context.exports) {
                if (context.exports.hasOwnProperty(i)) {
                    console.log('Exporting "' + i + '" from the exports variable.');
                    module[i] = context.exports[i];
                }
            }
            for (var i in context.module.exports) {
                if (context.module.exports.hasOwnProperty(i)) {
                    console.log('Exporting "' + i + '" from the module.exports variable.');
                    module[i] = context.module.exports[i];
                }
            }
            _handleExports(module, moduleConf, callback);
        }
    }
    
    function applyConfiguration (conf, callback, errorFn) {
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
            return function depsPool() {
                !--_c && callback(conf);
            };
        })();
        function importsLoader (name, ref) {
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
        }
        
        function modulesLoader (name, ref) {
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
        }
        
        function modulesLoaderByRef (name, ref) {
            var mod = modules[ref];
            if (!mod) {
                if (_isServer) {
                    mod = modules[ref] = require(ref);
                } else {
                    throw new Error('Unable to load the module ' + name); //@TODO Plugin idea => browser-side auto loader by module name
                }
            }
            conf.deps[name] = mod;
            depsPool();
        }
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
    }
    
    function _moduleSrc (conf, callback, errorFn) {
        var moduleConf = conf || {},
            callback = callback || function () {},
            errorFn = errorFn || function () {},
            rawText = conf.contents ? conf.contents : [],
            text = rawText.split('\n'),
            declaration = [],
            endComment = false,
            inComment = false;
        var declaration = '';
        var comments = rawText.match(/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg); //@TODO Fix: Doesn't handle single line commments (see libs/jquery-1.7.2.min.js)
        if (!comments) {
            return loadModule(moduleConf, callback);
        }
        // @TODO Enhance: Only a single declaration is allowed per file, as the first comment
        var split = comments[0].split("\n");
        for (var j = 0, _l2 = split.length; j < _l2; j++) {
            declaration += split[j].trim().replace(/(^\/\*+)|(\*+\/?)/, '');
        }
        if (declaration.length) {
            moduleConf = parse(declaration, moduleConf);
            if (is(moduleConf, 'string')) {
                errorFn(moduleConf);
            } else {
                applyConfiguration(moduleConf, function (parsedConf) {
                    loadModule(parsedConf, callback);
                }, errorFn.origFn);
            }
        } else {
            loadModule(moduleConf, callback);
        }
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
     */
    function _module (moduleSrc, callback, errorFn) {
        var _error = function (msg) {
            _errModules = _errModules || [];
            _errModules.indexOf(moduleSrc) === -1 && _errModules.push(moduleSrc);
            if (is(errorFn, 'function')) {
                errorFn();
            } else {
                throw new Error( '(' + moduleSrc + ') ' + msg);
            }
        };
        _error.origFn = errorFn;
        var moduleConf = is(moduleSrc, 'string') ?  {src: moduleSrc} : moduleSrc;
        !moduleConf.format && _isServer && (moduleConf.format = 'commonJS');
        var uri = is(moduleSrc, 'string') ? moduleSrc : moduleSrc.name;
        if (uri) {
            !_isServer && xhr({ url: uri,
                error: function xhrError () {
                    _error('Unable to fetch the module "' + moduleSrc + '"');
                },
                success: function xhrSuccess (res) {
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
            is(moduleSrc, 'object') && _moduleSrc(moduleSrc, callback, _error);
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
            } else if (srcAttr == "text/shepherd-js/config"){
                confs.push(script.innerHTML.trim());
            }
        }
        initConfig(confs);
        initModules(modules);
    })
    
    if (typeof MINIFY == 'undefined') {
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
        };
        if (_isServer) {
            exports = module.exports = me.s6d;
        }
    }
})(this, harmonyParser);

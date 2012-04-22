(function () {
    var modules = [];
//    var refToModule = {};
    return {
        "registerModule": function (index, src, name) {
            // src && (refToModule[src] = index);
            // name && (refToModule[name] = index);

        },
        "getModules": function () {
            return modules;
        },
        /**
         * Executes the contents of the module and retrieves its exports on the server
         * @param {Object} moduleConf the configuration of the module
         * @param {String} contents The textual contents of the module
         * @return {Object} The module exports as defined in the configuration
         **/
        "loadModule" : function (moduleConf, contents) {
            var context = moduleConf.imports;
            var module;
            
            var moduleArgs = [],
                argsName = [];
            for (var i in context) {
                if (context.hasOwnProperty(i)) {
                    argsName.push(i);
                    moduleArgs.push(context[i]);
                }
            }
            console.warn('Should have mocked window');
            var returns = moduleConf.exports ?
                '{' + moduleConf.exports.map(function (v) { return v.dest + ':(' + ['window.' + v.src, 'this.' + v.src, v.src].join('||') + ')'; }).join(',') + '}'
                : '{}';
            modules.push( {
                body: contents,
                argNames: argsName,
                argRefs: moduleArgs,
                exports: returns
            });
            return modules.length - 1;
        },
        "loadModuleReferenceBySource" : function (src) {
            try {
                return require(src);
            } catch (e) {
                throw new Error('The required module %1 doesn\'t exist'.replace('%1', src));
            }
        },
        "retrieveFileContents" : function (uri, moduleConf, _moduleSrc, modulePromise) {
            /**
             * Performs a request to retrieve the contents of a non-local file
             **/
            function serverModule (parsedURL) {
                var defer = when.defer();
                var get = require(parsedURL.protocol.indexOf('https') !== -1 ? 'https' : 'http').get;
                var newURL = {host: parsedURL.host, path: parsedURL.pathname};
                var data = '';
                parsedURL.port && (newURL.port = parsedURL.port);
                get(newURL, function (res) {
                    res.on('data', function (chunk) {
                        data += chunk;
                    });
                    res.on('end', function () {
                        defer.resolve(data);
                    });
                    res.on('error', function (msg) {
                        defer.reject(msg);
                    });
                });
                return defer;
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
                    path =  !path ? require('fs').statSync(__dirname + '/../' + uri).isFile() && (__dirname + '/../' + uri) : path;
                } catch (e) { /** Nothing here **/ }
                try {
                    path =  !path ? require('fs').statSync(process.cwd() + '/' + uri).isFile() && process.cwd() + '/' + uri : path;
                } catch (e) { /** Nothing here **/ }
                return path;
            }

            var modPath, url = require('url'), parsedURL = url.parse(uri);
            if(parsedURL.host) {
                when(serverModule(parsedURL)).then(
                    function (moduleSrc) {
                        moduleConf.contents = moduleSrc;
                        when(_moduleSrc(moduleConf)).then(
                            function (conf) {
                                modulePromise.resolve(conf);
                                return conf;
                            },
                            function (msg) {
                                modulePromise.reject(msg);
                            }
                        );
                    },
                    function xhrError (msg) {
                        _error('Unable to fetch the module "' + uri + '" because: ' + msg);
                    }
                );
                return modulePromise;
            } else {
                modPath = _serverPathDetection(uri);
                if (!modPath) {
                    modulePromise.reject('Unable to locate file ' + uri);
                    return modulePromise;
                } else if (this.is(modPath, 'object')) { //@TODO Check
                    moduleConf.deps = moduleConf.deps || {};
                    moduleConf.deps[modPath.uri] = modPath.node_module;
                } else {
                    try {
                        moduleConf.contents = require('fs').readFileSync(modPath, 'utf-8');
                    } catch (e) {
                        modulePromise.reject(e.message);
                        return modulePromise;
                    }
                }
                when(_moduleSrc(moduleConf)).then(
                    function (conf) {
                        modulePromise.resolve(conf);
                        return conf;
                    },
                    function (msg) {
                        modulePromise.reject(msg);
                    }
                );
                return modulePromise;
            }
        },
        "onLoad" : function (initConfig, initModules, s6d) {
            exports = module.exports = s6d;
        }
    }
})();
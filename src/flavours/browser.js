{
    /**
     * Executes the contents of the module and retrieves its exports on the browser
     * @param {Object} moduleConf the configuration of the module
     * @param {String} contents The textual contents of the module
     * @return {Object} The module exports as defined in the configuration
     **/
    "loadModule" : (function () { var _extDepsCount = 0; return function (moduleConf, contents, runInTag) {
        var context = moduleConf.imports;
        var module;

        context.window = {};
        for (var i in window) {
            context.window[i] = window[i];
        }
        var returns = moduleConf.exports ?
            '{' + moduleConf.exports.map(function (v) { return v.dest + ':(' + ['window.' + v.src, 'this.' + v.src, v.src].join('||') + ')'; }).join(',') + '}'
            : '{}';
        var moduleArgs = [];
        var argsName = [];
        for (var i in context) {
            if (context.hasOwnProperty(i)) {
                argsName.push(i);
                moduleArgs.push(context[i]);
            }
        }
        if (runInTag) {
            var script = document.createElement('script'),
                head = document.getElementsByTagName('head')[0],
                module;
            script.type = 'text/javascript';
            var extDepIndex = _extDepsCount++;
            script.innerHTML = '(function runner (' + argsName.join(', ') + ') {\n' + contents + '\n;s6d[' + extDepIndex + '](' + returns + ');\n}).apply({}, s6d[' + extDepIndex + ']())';
            moduleConf.src && script.setAttribute('data-src', moduleConf.src);
            moduleConf.name && script.setAttribute('name', moduleConf.name);
            var me = this;
            this.s6d[extDepIndex] = function (exports) {
                if (exports) {
                    delete me.s6d[extDepIndex];
                    module = exports;
                }
                return me.s6d[extDepIndex];
            };
            head.appendChild(script);
            return module;
        } else {
            var fn;
            if (contents.apply && contents.call) {
                fn = contents;
            } else {
                fn = Function.apply({}, argsName.concat([contents +  ';\nreturn ' + returns]));
            }
            return fn.apply({}, moduleArgs);
        }
    }})(),
    "loadModuleReferenceBySource" : function (src) {
        throw new Error('The required module %1 doesn\'t exist'.replace('%1', src));
    },
    "retrieveFileContents" : function (uri, moduleConf, _moduleSrc, modulePromise) {
        /**
         *  XHR request
         **/
        function xhr (url) {
            var deferred = when.defer(),
                http = ('XMLHttpRequest' in this) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
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
                    var msg = 'Unable to fetch the module "' + _moduleSrc + '" (status code: ' + code + ')';
                    modulePromise.reject(msg);
                }
            );
        return modulePromise;
    },
    "onLoad" : function (initConfig, initModules) {
        function onReady () {
            var confs = [];
            var modules = [];
            for (var i = 0; i < document.scripts.length; i++) {
                var script = document.scripts[i],
                    srcAttr = script.getAttribute('type');
                if (srcAttr == "harmony") {
                    modules.push(script);
                } else if (srcAttr == "text/shepherd-config") {
                    confs.push(script.innerHTML.trim());
                }
            }
            initConfig(confs);
            initModules(modules);
        }
        window.addEventListener && window.addEventListener('load', onReady); 
        !window.addEventListener && (window.onload = onReady);
    }
}
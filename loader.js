/**
 * !! Module declaration MUST be the header of the file
 * 
 * See http://wiki.ecmascript.org/doku.php?id=harmony:modules for parsing and use case reference 
 */
(function (me) {
    
    
    
    
    var modules = {},
        _errCb,
        _errModules = null;
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
                var text = res.responseText.split('\n');
                var moduleConf = {};
                for (var i = 0; i < text.length; i++) {
                    var cmd = text[i].trim().match(/^"\s*(.*)\s*\{?";?$/);
                    if (cmd) {
                        var tokens = cmd.pop().split(' '),
                            fn = tokens.shift();
                        switch (fn) {
                            case 'module':
                                if (tokens[0] && tokens[0] !== 'from') {
                                    moduleConf.name = tokens[0];
                                }
                                break;
                            case 'export':
                                moduleConf.export = moduleConf.export || [];
                                moduleConf.export.push(tokens[0]);
                                break;
                            case 'import':
                                moduleConf.import = moduleConf.import || {};
                                tokens[0].split(/\s*,\s*/).forEach(function (v) {
                                    moduleConf.import[v] = modules[v];
                                });
                                break;
                            case '}': //@TODO Closes the module definition
                                break;
                            default:
                                _error('Unknown token: ' + fn);
                                break;
                        }
                    } else { // At the first line where we do not find a module-related command, we stop the module evaluation.
                        break;
                    }
                }
                
                var returns = moduleConf.export ?
                    '{' + moduleConf.export.map(function (v) { return v + ':' + v; }).join(',') + '}'
                    : '';
                var fn = new Function('imports', 'with (imports) { ' + text.join('\n') + '; return ' + returns + ';}');
                var module = fn.apply({}, [moduleConf.import || {}]);
                modules[moduleSrc] = module;
                moduleConf.name && (modules[moduleConf.name] = module); // Modules are accessible either via their names or their URI
                if (typeof callback == 'function') {
                    callback(module);
                }
            }
        });
    }
    for (var i = 0; i < document.scripts.length; i++) {
        var script = document.scripts[i];
        if (script.getAttribute('type') === 'text/js-no-harm') {
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
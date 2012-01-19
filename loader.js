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
    var parse = function (declaration) {
        var moduleConf = {};
    	for (var j = 0; j < declaration.length; j++) {
    		var cmd = declaration[j];
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
                    return 'Unknown token: ' + fn;
                    break;
            }
    	}
    	return moduleConf;
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
                var text = res.responseText.split('\n');
                var declaration = [],
                	moduleConf = {};
                for (var i = 0; i < text.length; i++) {
                    var cmd = text[i].trim().match(/^"\s*(.*)\s*\{?";?$/);
                    if (cmd) {
                    	moduleConf = declaration.push(cmd);
                    } else { // At the first line where we do not find a module-related command, we stop the module evaluation.
                        break;
                    }
                }
                if (declaration.length) {
                	moduleConf = parse(declaration);
                	(typeof moduleConf == 'string') && _error(moduleConf); 
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
/**
 * !! Module declaration MUST be the header of the file
 * 
 * See http://wiki.ecmascript.org/doku.php?id=harmony:modules for parsing and use case reference 
 */
(function () {
//	var _keyWords = ['module', 'export', 'import'];
	var modules = {};
	/**
	 * Retrieves the file corresponding to the module and declares it
	 */
	var _module = function (moduleSrc) {
		reqwest({  //@TODO update with generic AJAX request
			url: moduleSrc,
			type: 'js-module',
			success: function (res) {
				var text = res.responseText.split('\n');
				var moduleConf = {};
				for (var i = 0; i < text.length; i++) {
					var cmd = text[i].trim().match(/^"\s*@(.*)";/);
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
						}
					} else { // At the first line where we do not find a module-related command, we stop the module evaluation.
						break;
					}
				}
				var returns = moduleConf.export.map(function (v) {
					return v + ':' + v;
				});
				returns = '{' + returns.join(',') + '}';
				var fn = new Function(text.join('\n') + '; return ' + returns + ';');
				var module = fn.apply({});
				console.log(moduleSrc)
				modules[moduleSrc] = module;
				moduleConf.name && (modules[moduleConf.name] = module); // Modules are accessible either via their names or their URI
				console.log(modules);
			}
		});
	}
	for (var i = 0; i < document.scripts.length; i++) {
		var script = document.scripts[i];
		if (script.getAttribute('type') === 'text/no-harm') {
			var moduleSrc = script.getAttribute('src');
			if (moduleSrc && !modules.hasOwnProperty(moduleSrc)) {
				_module(moduleSrc);
			}
		}
	}
})();
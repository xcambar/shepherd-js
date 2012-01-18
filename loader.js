(function () {
	var _keyWords = ['module', 'export', 'import'];
	var modules = {};
	for (var i = 0; i < document.scripts.length; i++) {
		var script = document.scripts[i];
		if (script.getAttribute('type') === 'text/javascript-module') {
			var moduleSrc = script.getAttribute('src');
			if (moduleSrc && !modules.hasOwnProperty(moduleSrc)) { //@TODO update with generic AJAX request
				reqwest({
					url: moduleSrc,
					type: 'js-module',
					success: function (res) {
						var text = res.responseText.split('\n');
						var module = {};
						for (var i = 0; i < text.length; i++) {
							var cmd = text[i].trim().match(/^"\s*@(.*)";/);
							if (cmd) {
								var tokens = cmd.pop().split(' '),
									fn = tokens.shift();
								console.log(tokens, fn);
								switch (fn) {
									case 'module':
										if (tokens[0] !== 'from') {
											module.name = tokens[0];
										}
										break;
									case 'export':
										module.export = module.export || [];
										module.export.push(tokens[0]);
								}
							}
						}
						var returns = module.export.map(function (v) {
							return v + ':' + v;
						});
						returns = '{' + returns.join(',') + '}';
						var fn = new Function(text.join('\n') + '; return ' + returns + ';');
						var module = fn.apply({});
						modules[module.name] = modules[moduleSrc] = module;
					}
				});
			}
		}
	}
})();
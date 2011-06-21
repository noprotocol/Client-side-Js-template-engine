(function($) {
	$.fn.mapper = function(data, fnmap) {
		
		var valueTags = ['input', 'option'];
				
		var inarray = function(a, v) {
			l = a.length;
			while(l--) if (a[l] == v) return true; return false;
		}
		
		var trim = function(str) {
			var	str = str.replace(/^\s\s*/, ''),
				ws = /\s/,
				i = str.length;
			while (ws.test(str.charAt(--i)));
			return str.slice(0, i + 1);
		}
		
		$(this).each(function() {
			var map = function(node, data, attr, fnmap) {
				
				switch(data.constructor.name) {
					
				case "String": case "Number":
				
					if (inarray(valueTags, node.tagName.toLowerCase())) node.value = data;
					else if (attr === undefined || attr === '') node.appendChild(document.createTextNode(data));
					else {
						var val = node.getAttribute(attr);
						node.setAttribute(attr, (val ? val + ' ' : '') + data);
					}
					if (fnmap) for(var i in fnmap) if (fnmap[i].constructor.name == "Function") node[i] = fnmap[i];
					break;
					
				case "Array":
				
					var children = node.children, child = children[0], j = 0, m = children.length;
					if (child === null) return node;
					for (var i = 0, l = data.length; i < l; i++) {
						node.appendChild(map(child.cloneNode(true), data[i], undefined, (fnmap && fnmap[0] ? fnmap[0] : fnmap)));
						if (m > 1) { if (++j < m) child = children[j]; else child = children[0]; }
					}
					while(m--) node.removeChild(children[m]);
					break;
					
				case "Object":
					var c = false;
					if ((c = node.getAttribute('class'))) {
						var cl = c.split(' '), m = cl.length, val = '', a = '', al = [];
						while (m--) { 
							if ((a = cl[m]) && (al = a.split(':')) && (val = data[al[0]])) {
								if (al[1] != undefined) {	
									node.setAttribute('class', trim(node.getAttribute('class').replace(a, '')));
								}
								map(node, val, al[1], (doFnMap && fnmap ? (fnmap[al[0]] ? fnmap[al[0]] : fnmap) : false)); 
							}
						}
					}
					var children = node.children, l = children.length;
					while(l--) { map(children[l], data, undefined, fnmap); } 
					break;
				}
				return node;
			}
			
			var doFnMap = fnmap ? true : false;
			this.parentNode.replaceChild(map(this.cloneNode(true), data, undefined, fnmap), this);
		});
	}	
})(jQuery);
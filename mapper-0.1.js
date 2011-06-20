(function($) {
	$.fn.mapper = function(data) {
		
		var valueTags = ['input', 'option'];
		
		var inArray = function(a, v) {
			l = a.length;
			while(l--) if (a[l] == v) return true; return false;
		}
		
		$(this).each(function() {
			var map = function(node, data, attr) {
				switch(data.constructor.name) {
					
				case "String": case "Number":
				
					if (inArray(valueTags, node.tagName.toLowerCase())) node.value = data;
					else if (attr === undefined) node.appendChild(document.createTextNode(data));
					else {
						var val = node.getAttribute(attr);
						node.setAttribute(attr, (val ? val + ' ' : '') + data);
					}
					break;
					
				case "Array":
				
					var firstchild = node.children[0];
					if (firstchild === null) return node;
					for (var i = 0, l = data.length; i < l; i++) {
						node.appendChild(map(firstchild.cloneNode(true), data[i]));
					}
					node.removeChild(firstchild);
					break;
					
				case "Object":
				
					var dig = true;
					if (node.hasAttribute('class')) {
						var c = node.getAttribute('class'), cl = c.split(' '), m = cl.length, val = '', a = '', al = [];
						while (m--) { 
							if ((a = cl[m]) && (al = a.split(':')) && (val = data[al[0]])) {
								if (al[1] != undefined) {
									node.setAttribute('class', node.getAttribute('class').replace(a, ''));
								}
								map(node, val, al[1]); 
								dig = false;
							}
						}
					}
					if (dig) {
						var children = node.children, l = children.length;
						while(l--) { map(children[l], data); } 
					}
					break;
				}
				return node;
			}
			
			this.parentNode.replaceChild(map(this.cloneNode(true), data), this);
		});
	}	
})(jQuery);
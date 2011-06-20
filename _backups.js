
function lister(elmNode, data) {
	var child = elmNode.firstChild, l = data.length;
	if (child === null) return;
	while (child.constructor.name.toLowerCase() == "text") child = child.nextSibling;
	console.log(elmNode, child);
	while (l--) {
		var clone = child.cloneNode(true);
		//console.log('clone', clone, data[l]);
		var result = mapper(clone, data[l]);
		//console.log('mapper', result);
		elmNode.appendChild(result);
	}
	//elmNode.removeNode(child);
}

function mapper1(elmNode, data) {
	if (typeof data == "object") {
		var child = elmNode.firstChild, cl = [], l = 0, val = '', type = '', d = document, text;
		if (child === null) return;
		while (child.constructor.name.toLowerCase() == "text") child = child.nextSibling;
		do {
			console.log(child.nodeName, child.getAttribute('class'), data);
			//mapper(child, data);
			if (!child.hasAttribute('class')) continue;
			cl = child.getAttribute('class').split(' ');
			l = cl.length;
			while (l--) {
				if (!(val = data[cl[l]])) continue;
				if (typeof(val) == "string" || typeof(val) == "number") {
					//console.log(child, val)
					text = d.createTextNode(val);
					child.appendChild(text);
				} else if (val.constructor.name == "Array") {
					console.log('array');
					lister(child, val);
					//mapper(child, val);	
				} else if (val.constructor.name == "Object") {
					mapper(child, val);
				}
			}
		} while ((child = child.nextElementSibling));
	}
	return elmNode;
}

function mapper2(node, data) {
	console.log(node.nodeName, node);
	var children = node.children, l = children.length;
	while(l--) { mapper(children[l], data); }
	if (!node.hasAttribute('class')) return node;
	var classes = node.getAttribute('class').split(' '),
		m = classes.length;
	while (m--) {
		if (!(val = data[classes[m]])) continue;
		switch(val.constructor.name) {
		case "String": case "Number":
			node.appendChild(document.createTextNode(val));
			console.log(node);
			break;
		case "Array":
			var firstchild = node.children[0], n = data.length;
			if (firstchild === null) return;
			while (l--) {
				var result = mapper(firstchild.cloneNode(true), data[l]);
				elmNode.appendChild(result);
			}
			elmNode.removeNode(child);
			break;
		case "Object":
			//mapper(child, val);
		}
	}
	return node;
}	

// Convert grouped JSON to indented list.
function json2indent(node, level) {
	//console.log(node)
	level = level || 0;
	var indent = "";
	for (var i = 0; i < level; i++) {
		indent += " ";
	}
	console.log(indent + (node.name || "."));
	indent += " ";
	node.items.forEach(function (item) {
		//console.log(indent + item.url);
	})
	if (node.children) {
		node.children.forEach(
			function (child) {
				json2indent(child, level+1);
			})
	}
}

// node.js
if (typeof(exports) !== "undefined" && require) {
	exports.json2indent = json2indent;
}
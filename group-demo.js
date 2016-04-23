var group = require(__dirname + "/group").group;

var links = ["http://svr/?a=1&b=1","http://svr/?a=1&b=2","http://svr/?a=2&b=1","http://svr/?a=2&b=2"];
console.log("__________________________________________");
console.log("Demo "+1);
console.log("In:\n" + links.join("\n") + "\n")
var root = group(links);
json2indent(root);

var links = ["http://svr/?a=1&b=1","http://svr/?a=1&b=2","http://svr/?a=1&b=3","http://svr/?a=1&b=4","http://svr/?a=1&b=5","http://svr/?a=1&b=6"];
console.log("__________________________________________");
console.log("Demo "+2);
console.log("In:\n" + links.join("\n") + "\n")
var root = group(links);
json2indent(root);

// Convert grouped JSON to indented list.
function json2indent(node, level) {
	//console.log(node)
	level = level || 0;
	var indent = "";
	for (var i = 0; i < level; i++) {
		indent += "  ";
	}
	console.log(indent + node.name);
	indent += "  ";
	node.items.forEach(function (item) {
		console.log(indent + item.url);
	})
	if (node.children) {
		node.children.forEach(
			function (child) {
				json2indent(child, level+1);
			})
	}
}

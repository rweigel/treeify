var json2string = require(__dirname+"/json2string").json2string;

// Convert grouped JSON to indented list.
function json2indentbrief(node, level) {

	level = level || 0;
	var indent = "";
	for (var i = 1; i < level; i++) {
		indent += "  ";
	}

	console.log("node.name: " + node.name)
	
	//if (level > 0) {
		//if (node.children) {
			console.log(indent + "+" + node.name);
			indent += "  ";
			node.items.forEach(function (item) {
				//if (item.tokens.length > 1) {
					console.log(indent + "-" + item.url);
					//console.log(indent + "-" + item.tokens[item.tokens.length-1]);
				//}
			})
		//} else {
			//if (node.name) {
		//		console.log(indent + "-" + node.name);		
			//}
		//}
	//}

	if (node.children) {
		node.children.forEach(
			function (child) {
				json2indentbrief(child, level+1);
			})
	}
}

// node.js
if (typeof(exports) !== "undefined" && require) {
	exports.json2indentbrief = json2indentbrief;
}
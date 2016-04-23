var group = require(__dirname+"/group").group;
var treeify = require(__dirname+"/treeify").treeify;

//var links = ["http://svr/?a=1&b=1"];
//var root = group(links);
//console.log(root)

var links = ["cri.AAT3","cri.AATB","cri_c.AAT3","cri_c.AAT3.minute","cri_c.AATB.minute"];
var links = ["http://svr/?a=1&b=1","http://svr/?a=1&b=2","http://svr/?a=2&b=1","http://svr/?a=2&b=2"];
var links = ["http://svr/?a=1&b=1","http://svr/?a=1&b=2","http://svr/?a=1&b=3","http://svr/?a=1&b=4","http://svr/?a=1&b=5","http://svr/?a=1&b=6"];

if (1) {
	var root = group(links, {}, tokenize);
	json2indent(root);

	function tokenize(url) {
		var ret = url.split("\&");
		//console.log(ret)
		return ret;
	}
}

function json2indent2(obj,level) {

	level = level || 0;
	var indent = " ";
	for(var i=0;i<level;i++){
		indent += " ";
	}

	if (level == 0) {
		console.log("root")
	}
	function isarray(a) {
		if( Object.prototype.toString.call( a ) === '[object Array]' ) {
			return true;
		}
		return false;
	}

	for (key in obj) {
		if (isarray(obj[key])) {
			console.log(indent + key)
			for (var i = 0; i < obj[key].length; i++) {
				console.log(indent + indent + obj[key][i]);
			}
		} else {
			console.log(indent + key)
			json2indent2(obj[key],level+1)
		}
	}
}

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

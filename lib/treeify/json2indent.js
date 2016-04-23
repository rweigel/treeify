function json2indent(obj,level) {

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
			json2indent(obj[key],level+1)
		}
	}
}

// node.js
if (typeof(exports) !== "undefined" && require) {
	exports.json2indent = json2indent;
}
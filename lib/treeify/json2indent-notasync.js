function json2indent(obj, cb) {

	// json2indent(json)
	// json2indent({json: json, stream: true|false})

	if (typeof(obj.ncalls) === "undefined") {
		// First call
		obj.ncalls = 0; // Used to determine when done.
		obj.output = "";
		obj.cb = cb;
		obj.level = 0;
		obj.stream = obj.stream || false;
	}

	level = obj.level;

	function isarray(a) {
		if (Object.prototype.toString.call( a ) === '[object Array]') {
			return true;
		}
		return false;
	}

	var indent = "";
	for (var i=0;i < level;i++) {
		indent += " ";
	}

	if (level == 0) {
		if (isarray(obj.json)) {
			if (obj.stream) console.log(indent + obj.json[0]);
			return indent + obj.json[0];
		}		
	}

	for (key in obj.json) {
		if (isarray(obj.json[key])) {
			json2indent.output += indent + key + "\n";
			if (obj.stream) console.log(indent + key);
			for (var i = 0; i < obj.json[key].length; i++) {
				obj.output += indent + " " + obj.json[key][i] + "\n";
				if (obj.stream) console.log(indent + " " + obj.json[key][i]);
			}
		} else {
			obj.output += indent + key + "\n";
			if (obj.stream) console.log(indent + key);
			obj.Ncalls += 1;
			obj.level = level+1;
			json2indent(obj.json[key], level+1);
			obj.Ncalls -= 1;
		}
	}

	if (obj.Ncalls == 0 || typeof(cb) === "undefined") {
		return obj.output;
	} else {
		obj.cb(obj.output);
	}

}

// node.js
if (typeof(exports) !== "undefined" && require) {
	exports.json2indent = json2indent;
}
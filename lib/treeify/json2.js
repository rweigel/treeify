function json2indent(obj, id, level) {

	if (typeof(json2indent[id]) === "undefined") {

		// TODO: Use MD5 or https://jwt.io/
		var id = obj.toString().length + Math.random().toString();

		// First call
		json2indent[id].Ncalls = 0;
		json2indent[id].Output = "";
		//json2indent[id].cb     = cb;
		if (obj.stream) {
			json2indent[id].stream = true;
			var obj = obj.json;
			delete obj.json;
			delete obj.stream;
			console.log(obj)
		} else {
			json2indent[id].stream = false;
		}
	}

	function isarray(a) {
		if (Object.prototype.toString.call(a) === '[object Array]') {
			return true;
		}
		return false;
	}

	level = level || 0;
	var indent = "";
	for (var i=0;i < level;i++) {
		indent += " ";
	}

	if (level == 0) {
		if (isarray(obj)) {
			if (json2indent[id].stream) console.log(indent + obj.join("\n"));
			return indent + obj.join("\n");
		}		
	}

	for (key in obj) {
		if (isarray(obj[key])) {
			json2indent[id].Output += indent + key + "\n";
			if (json2indent[id].stream) console.log(indent + key);
			for (var i = 0; i < obj[key].length; i++) {
				json2indent[id].Output += indent + " " + obj[key][i] + "\n";
				if (json2indent[id].stream) {
					console.log(indent + " " + obj[key][i]);
				}
			}
		} else {
			json2indent[id].Output += indent + key + "\n";
			if (json2.stream) console.log(indent + key);
			json2indent[id].Ncalls += 1;
			json2indent[id](obj[key], id, level+1);
			json2indent[id].Ncalls -= 1;
		}
	}

	if (json2indent[id].Ncalls == 0 || typeof(cb) === "undefined") {
		return json2indent[id].Output;
	} else {
		json2indent[id].cb(json2indent[id].Output);
	}

}

// node.js
if (typeof(exports) !== "undefined" && require) {
	exports.json2indent = json2indent;
}
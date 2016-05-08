function json2d3json(obj, Out, cb) {

	// json = json2d3json(obj)
	// json2d3json(obj,cb)

	if (typeof(Out) === "function") {
		cb = Out;
		Out = null;
	}
	if (!Out) {
		Out = {};
		Out.name = "root"
		Out.children = []

		if (isarray(obj)) {
			for (var i = 0; i < obj.length; i++) {
				Out.children[i] = {};
				Out.children[i].name = obj[i];
			}
			//console.log(JSON.stringify(Out,null,4))
			if (cb) {
				cb(Out);
			} else {
				return Out;
			}
		}
		json2d3json(obj,Out)
		if (cb) {
			cb(Out);
		} else {
			return Out;
		}
		//console.log(JSON.stringify(Out,null,4))
	}

	function isarray(a) {
		if ( Object.prototype.toString.call( a ) === '[object Array]' ) {
			return true;
		}
		return false;
	}

	k = 0;
	for (var key in obj) {
		Out.children[k] = {}
		Out.children[k].name = key
		Out.children[k].children = []
		if (isarray(obj[key])) {
			for (var i = 0; i < obj[key].length; i++) {
				Out.children[k].children[i] = {};
				Out.children[k].children[i].name = obj[key][i];
			}
			k = k+1;
		} else {
			arguments.callee(obj[key],Out.children[k]);
		}
	}	
}

// node.js
if (typeof(exports) !== "undefined" && require) {
	exports.json2d3json = json2d3json;
}
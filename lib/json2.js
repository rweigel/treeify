function json2(obj, opts, level, id) {

	// json2(obj)
	// json2(obj,"text|html|apxml")
	// json2(obj,"text|html|apxml", cb)

	// opts = {mode: "text|html|apxml", stdout: false|true}
	// json2(obj,opts)
	// json2(obj,opts,cb)

	if (typeof(opts) === "string") {
		var mode = opts;
	} else if (typeof(opts) === "object") {
		var stdout = opts.stdout || false;
		var mode = opts.mode || "text";
	} else {
		var stdout = false;
		var mode = "text";
	}
	opts = {};
	opts.mode = mode;
	opts.stdout = stdout;

	if (arguments.length == 3) {
		opts.cb = level;
		level = 0;
	} 

	var level = level || 0;

	if (level == 0) {
		var id = (new Date().getTime().toString()) + Math.random().toString();
		json2[id] = "";
	}

	write = function (d) {
		if (stdout) {
			console.log(json2[id] + d.replace(/\n$/,""))
		} else {
			json2[id] = json2[id] + d;
		}
	}

	function isarray(a) {
		if ( Object.prototype.toString.call( a ) === '[object Array]' ) {
			return true;
		}
		return false;
	}

	if (mode === 'text') {
		var indent = "";
		for (var i = 1;i < level;i++) {
			indent += " ";
		}
	} else {
		var indent = " ";
		for (var i = 0;i < level;i++) {
			indent += " ";
		}
	}

	var indent2 = indent  + indent;
	var indent3 = indent2 + indent;
	var indent4 = indent3 + indent;

	if (mode === 'apxml') {
		var DirOpenRoot = '<bookmark-list version="1.1">' + "\n";
		var DirCloseRoot = '</bookmark-list>';
		var FolderOpen = function (key) {
			var str = '<bookmark-folder><title>'+key+'</title><description></description><bookmark-list>' + "\n";
			return str;
		}
		var FolderClose = '</bookmark-list></bookmark-folder>' + "\n";

		var FileOpen    = '<bookmark>' + "\n"
		var FileClose   = '</bookmark>' + "\n"

		var File = function (key) {
			var str = '<title></title><description></description><uri>'+key+'</uri><description-url></description-url>' + "\n";
			return str;
		}
	}

	if (mode === 'html') {
		var DirOpenRoot = '<ul class="tree">' + "\n";
		var DirCloseRoot = '</ul>';
		var FolderOpen = function (key) {
			var str = '<li>'+key+'<div class="expander"></div><ul>' + "\n";
			return str;
		}
		var FolderClose = '</ul></li>' + "\n";

		var FileOpen    = '<li>' + "\n"
		var FileClose   = '</li>' + "\n"

		var File = function (key) {
			var str = key + "\n";
			return str;
		}
	}

	if (level == 0 && isarray(obj)) {
		if (mode !== "text") {
			write(DirOpenRoot);
		}
		if (mode === "text") {
			write(obj.join("\n"))
		} else {
			for (var i = 0;i < obj.length;i++) {
				write(indent + FileOpen);
				write(indent2 + File(obj[i]));
				write(indent + FileClose);				
			}			
		}
		if (mode !== "text") {
			write(DirCloseRoot);
		}
		if (typeof(opts.cb) === "undefined") {
			return json2[id];
		} else {
			opts.cb(json2[id]);
			return;
		}
	}

	if (level == 0) {
		if (mode !== "text") {
			write(DirOpenRoot);
		}
		arguments.callee(obj,opts,1,id);
		if (mode !== "text") {
			write(DirCloseRoot);
		}
		if (typeof(opts.cb) === "undefined") {
			return json2[id];
		} else {
			opts.cb(json2[id]);
			return;
		}
	}

	var tmp = "";
	for (var key in obj) {
		if (isarray(obj[key])) {
			if (mode === "text") {
				write(indent + key + "\n")
			} else {
				write(indent2 + FolderOpen(key))
			}
			for (var i = 0; i < obj[key].length; i++) {
				if (mode === "text") {
					write(indent + " " + obj[key][i] + "\n");
				} else {
					write(indent3 + FileOpen);
					write(indent4 + File(obj[key][i]));
					write(indent3 + FileClose);
				}
			}
			if (mode !== "text") {
				write(indent2 + FolderClose)
			}
		} else {
			if (mode === "text") {
				write(indent + key + "\n");
			} else {
				write(indent + FolderOpen(key));
			}
			arguments.callee(obj[key],opts,level+1,id);
			if (mode !== "text") {
				write(indent+FolderClose);
			}
		}
	}
}

// node.js
if (typeof(exports) !== "undefined" && require) {
	exports.json2 = json2;
}

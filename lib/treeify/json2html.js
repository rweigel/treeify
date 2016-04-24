function json2html(obj, level) {

	// Input format
	// { A: [ '.', 'B', 'C' ] }
	// { A: { B: [ 'C' ] } }
	// ["A","B","C"]

	function isarray(a) {
		if( Object.prototype.toString.call(a) === '[object Array]' ) {
			return true;
		}
		return false;
	}

	level = level || 0;
	var indent = "  ";
	for (var i=0;i<level;i++){
		indent += "  ";
	}

	// Special case where array is given.  No folders at root level.
	if (level == 0 && isarray(obj)) {
		console.log("<ul class='tree'>")
		for (var i = 0;i < obj.length;i++) {
			console.log('  <li>' + obj[i] + "</li>");
		}
		console.log("</ul>");
		return
	}

	if (level == 0) {
		console.log("<ul class='tree'>")
	}

	for (key in obj) {
		console.log(indent + "<li>" + key + "\n" + indent + indent + "<div class='expander'></div>")
		console.log(indent + indent + "<ul>")
		if (isarray(obj[key])) {
			for (i = 0;i < obj[key].length; i++) {			
				console.log(indent + indent + indent + "  <li>" + obj[key][i] + "</li>")
				obj[key][i]
			}
		} else {
			arguments.callee(obj[key], level + 1);
		}
		console.log(indent + indent + "</ul>\n"+ indent + "</li>")
	}
	if (level == 0) {
		console.log("</ul>")
	}
}

// node.js
if (typeof(exports) !== "undefined" && require) {
	exports.json2html = json2html;
}
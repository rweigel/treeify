function json2string(root) {
	console.log(JSON.stringify(root,
		function( key, value) {
				if ( key == 'parent') {return value.name;}
				else {return value;}
		} ,2)
	)
}
// node.js
if (typeof(exports) !== "undefined" && require) {
	exports.json2string = json2string;
}
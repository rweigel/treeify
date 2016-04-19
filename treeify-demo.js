var treeify = require(__dirname+"/lib/treeify").treeify;
var json2indent = require(__dirname+"/lib/json2indent").json2indent;

var links = ["http://svr/?a=1&b=1","http://svr/?a=1&b=2","http://svr/?a=2&b=1","http://svr/?a=2&b=2"];
console.log("__________________________________________");
console.log("Demo "+1);
console.log("In:\n" + links.join("\n") + "\n")
var root = treeify(links);
json2indent(root);

var links = ["http://svr/?a=1&b=1","http://svr/?a=1&b=2","http://svr/?a=1&b=3","http://svr/?a=1&b=4","http://svr/?a=1&b=5","http://svr/?a=1&b=6"];
console.log("__________________________________________");
console.log("Demo "+2);
console.log("In:\n" + links.join("\n") + "\n")
var root = treeify(links);
console.log(JSON.stringify(root,
	function( key, value) {
  		if ( key == 'parent') { return value.name;}
  		else {return value;}
	},2)
)
//json2indent(root);


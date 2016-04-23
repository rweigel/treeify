var group = require(__dirname+"/../group").group;
var links = ["http://svr/?a=1&b=1","http://svr/?a=1&b=2","http://svr/?a=1&b=3","http://svr/?a=1&b=4","http://svr/?a=1&b=5","http://svr/?a=1&b=6"];
var root = group(links, {"MAX_ITEMS": Infinity});

console.log("var JSONFILE=" 
	+ JSON.stringify(root["children"][0],
		function( key, value) {
	  		if ( key == 'parent') { return value.name;}
	  		else {return value;}
		},2)
)
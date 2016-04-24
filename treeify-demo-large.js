treeify = require(__dirname + "/treeify").treeify;
json2indent = require(__dirname + "/lib/treeify/json2indent").json2indent;

// node.js
if (typeof(exports) !== "undefined" && require){
	var data = require(__dirname+'/data/testdata.js').testdata();
} else {
	var data = testdata();
}
var d = [];
console.log("Start placing in array");
var start = new Date().getTime();
for (var i = 0;i < data.length;i++) {
	d[i] = data[i].value.replace("_",".");
}
var stop = new Date().getTime();
console.log("Finished placing in array in " + (stop - start) + " ms.");
var start = new Date().getTime();
var D = treeify(d,".");
var stop = new Date().getTime();
json2indent(D);
console.log("Finished computing tree in " + (stop - start) + " ms.");
//json2indent(D);

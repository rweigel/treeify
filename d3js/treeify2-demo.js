var treeify = require(__dirname+"/lib/treeify").treeify;
var treeify2 = require(__dirname+"/lib/treeify2").treeify;
var json2indent = require(__dirname+"/lib/json2indent").json2indent;
var json2string = require(__dirname+"/lib/json2string").json2string;
var json2indentbrief = require(__dirname+"/lib/json2indentbrief").json2indentbrief

var i = 0;
function display(i,links,options) {
	i++;
	console.log("__________________________________________");
	console.log("Demo "+i);
	console.log("Options: " + JSON.stringify(options));
	//console.log("In:\n" + links.join("\n") + "\n")
	console.log("In: " + JSON.stringify(links));
}

i = i+1;
var links = ["a","a","a.b","b.c","b.c.f2"];
var options = {}
display(i,links,options)
//var root = treeify(links, {}, function (url) {return url.split("\.")});
//json2indentbrief(root);
var root = treeify2(links);
console.log(root)

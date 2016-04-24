var group = require(__dirname+"/group").group;
var treeify = require(__dirname+"/treeify").treeify;
var json2string = require(__dirname + "/lib/json2string").json2string;
var json2indentg = require(__dirname + "/lib/group/json2indent").json2indent;
var json2indentt = require(__dirname + "/lib/treeify/json2indent").json2indent;

//var links = ["http://svr/?a=1&b=1","http://svr/?a=1&b=2","http://svr/?a=2&b=1","http://svr/?a=2&b=2"];
var links = ["http://svr/?a=1&b=1"];
var links = ["a=1&b=1","a=1&b=2","a=1&b=3","a=1&b=4","a=1&b=5","a=1&b=6"];
var links = ["a=1&b=1","a=1&b=2"];

//var links = ["A.B"];
//var links = ["A.B","A.C"];
//var links = ["A","A.B","A.C"]
var links = ["A.B.C"];
//var links = ["A.B.C",'D.E.F'];
//var links = ["A.B.C",'A.B.F'];
console.log("----------------")
var root = group(links, {}, function (url) {return url.split("\.")});
//console.log(json2string(root))
json2indentg(root);
console.log("----------------")
var root = treeify(links);
console.log(root)
json2indentt(root);
console.log("----------------")


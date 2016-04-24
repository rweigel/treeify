var group = require(__dirname + "/group").group;
var json2indent = require(__dirname + "/lib/group/json2indent").json2indent;
var json2indentbrief = require(__dirname + "/lib/group/json2indentbrief").json2indentbrief;

var links = ["http://svr/?a=1&b=1","http://svr/?a=1&b=2","http://svr/?a=2&b=1","http://svr/?a=2&b=2"];
console.log("__________________________________________");
console.log("Demo "+1);
console.log("In:\n" + links.join("\n") + "\n")
var root = group(links);
json2indent(root);
json2indentbrief(root);

var links = ["http://svr/?a=1&b=1","http://svr/?a=1&b=2","http://svr/?a=1&b=3","http://svr/?a=1&b=4","http://svr/?a=1&b=5","http://svr/?a=1&b=6"];
console.log("__________________________________________");
console.log("Demo "+2);
console.log("In:\n" + links.join("\n") + "\n")
var root = group(links);
json2indent(root);

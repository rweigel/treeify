var treeify = require(__dirname+"/lib/treeify").treeify;
var json2string = require(__dirname+"/lib/json2string").json2string;
var json2indentbrief = require(__dirname+"/lib/json2indentbrief").json2indentbrief
var json2html = require(__dirname+"/lib/json2html").json2html

//var links = ["a","b.f1","b.f2"];
var links = ["a","b","b.f1","c","d.f1"];

var root = treeify(links, {}, function (url) {return url.split("\.")});
json2html(root)

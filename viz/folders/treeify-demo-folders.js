treeify = require(__dirname + "/../../treeify").treeify;
json2 = require(__dirname + "/../../lib/json2").json2;

var D = treeify(["A.B.C","D.E.F","D.E"],".");
text = json2(D,"html");
console.log("var HTML='" + text.replace(/\n/g,"") + "'");

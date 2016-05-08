json2d3json = require(__dirname + "/../../lib/json2d3json").json2d3json;
treeify = require(__dirname + "/../../treeify").treeify;

var D = treeify(["A.B.C",'D.E.F'],".");
Out = json2d3json(D);
console.log("var JSONFILE=" + JSON.stringify(Out))

if (0) {
	json2d3json(D, function (Out) {
		console.log(JSON.stringify(Out, null, 4))
	})
}

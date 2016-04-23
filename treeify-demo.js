treeify = require(__dirname + "/treeify").treeify;
json2indent = require(__dirname + "/lib/treeify/json2indent").json2indent;
json2apxml  = require(__dirname + "/lib/treeify/json2apxml").json2apxml;

fs = require("fs");
runtest(1,true);
//runtest(2,true);
//runtest(3,true);
//runtest(4,true);
//runtest(5,true);
// Large file
//runtest(6,true);

function runtest(i,debug) {

	if (i == 1) {
		console.log("__________________________________________");
		console.log("Demo "+i);
		var d = ["cri.AAT3","cri.AATB","cri_c.AAT3","cri_c.AAT3.minute","cri_c.AATB.minute"];
		console.log("In:  " + d.join(" "))
		console.log(d.join(","))
		var D = treeify(d,".");
		console.log("Out: " + JSON.stringify(D));
		json2indent(D);
		json2indentbrief(D);
		json2apxml(D);
	}

	if (i == 2) {
		console.log("__________________________________________");
		console.log("Demo "+i);
		var d = ["A.B.C","A.B.D","A.Z.Z","D.Z.Z"];
		console.log("In:  " + d.join(" "))
		var D = treeify(d,".");
		console.log("Out: " + JSON.stringify(D));
		json2indent(D);
	}

	if (i == 3) {
		console.log("__________________________________________");
		console.log("Demo "+i);
		var d = ["A.B.C","D.Z.Z","A.B.D","A.Z.Z"];
		console.log("In:  " + d.join(" "))
		var D = treeify(d,".");
		console.log("Out: " + JSON.stringify(D));
		json2indent(D);
	}

	if (i == 4) {
		console.log("__________________________________________");
		console.log("Demo "+i);
		var d = ["AAA","ABK","ALE","AZZ"];
		var n = d.length;
		for (var i = 0;i<n;i++) {
			d[i] = d[i].substring(0,1) + "." + d[i];
		}
		console.log("In:  " + d.join(" "))
		var D = treeify(d,".");
		console.log("Out: " + JSON.stringify(D));
		json2indent(D);
	}

	if (i == 5) {
		console.log("__________________________________________");
		console.log("Demo "+i);
		var d = [];

		// node.js
		if (typeof(exports) !== "undefined" && require){
			var data = require('./data/js/testdata.js').testdata();
		} else {
			var data = testdata();
		}

		console.log("Start placing in array");
		var start = new Date().getTime();
		for (var i = 0;i < data.length;i++) {
			d[i] = data[i].value.replace("_",".");
		}
		var stop = new Date().getTime();
		console.log("Finished placing in array "+(stop-start)+" ms");
		var D = treeify(d,".");
		json2indent(D);
	}

	if (i == 6) {
		var xml2js = require('xml2js');

		// Long flat XML document.  Extract keys
		console.log("__________________________________________");
		console.log("Demo "+i);

		fs.readFile("xml/sscweb.xml",function (err,data) {

			parser = new xml2js.Parser();
			parser.parseString(data, function(err, res) {

				var links = extractURLs(res);
				for (var i = 0; i < links.length; i++) {
					var parameters = links[i].replace(/.*parameters=(.*?)\&.*/,"$1");
					//console.log(parameters)
					var dataset    = links[i].replace(/.*dataset=(.*?)\&.*/,"$1");
					//console.log(dataset)
					var catalog    = links[i].replace(/.*catalog=(.*?)\&.*/,"$1");
					//console.log(catalog)
					links[i] = catalog + "." + catalog + "/" + dataset + "." + catalog + "/" + dataset + "/" + parameters;
				}
				var D = treeify(links,".");
				json2indent(D);
				json2xml(D);
			})
		})

		function extractURLs(doc){
			// Extracts a list of URI node values
			var ret = [];
			for (var key in doc){
				if (key === "bookmark") {
					var urls = doc[key].map(function(item){
						return item.uri[0];
					});
					ret = ret.concat(urls);
				} else if (key === "bookmark-list" || key === "bookmark-folder"){
					if (Object.prototype.toString.call(doc[key]) === '[object Array]'){
						doc[key].forEach(function(item){
							ret = ret.concat(extractURLs(item));
						});
					} else {
						ret = ret.concat(extractURLs(doc[key]));
					}
				}
			}
			//console.log(ret)
			return ret;
		}
	}

}
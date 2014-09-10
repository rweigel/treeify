// node.js
if (typeof(exports) !== "undefined" && require){
	treeify = require(__dirname + "/js/treeify").treeify;
	fs = require("fs");
	runtest(1,true);
	runtest(2,true);
	runtest(3,true);
	runtest(4,true);
	runtest(5,true);
}

function runtest(i,debug) {

	if (i == 1) {
		console.log("__________________________________________");
		console.log("Demo "+i);
		var d = ["cri.AAT3","cri.AATB","cri_c.AAT3","cri_c.AAT3.minute","cri_c.AATB.minute"];
		var D = treeify(d,".");
		json2indent(D);
	}

	if (i == 2) {
		console.log("__________________________________________");
		console.log("Demo "+i);
		var d = ["A.B.C","A.B.D","A.Z.Z","D.Z.Z"];
		var D = treeify(d,".",json2indent);
		json2indent(D);
	}

	if (i == 3) {
		console.log("__________________________________________");
		console.log("Demo "+i);
		var d = ["A.B.C","D.Z.Z","A.B.D","A.Z.Z"];
		var D = treeify(d,".",json2xml);
		json2indent(D);
		json2xml(D);
	}

	if (i == 4) {
		console.log("__________________________________________");
		console.log("Demo "+i);
		var d = ["AAA","ABK","ALE","AZZ"];
		var n = d.length;
		for (var i = 0;i<n;i++) {
			d[i] = d[i].substring(0,1) + "." + d[i];
		}
		var D = treeify(d,".");
		json2indent(D);
		json2xml(D);

	}

	if (i == 5) {
		var xml2js = require('xml2js');

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
				if (0) {
				var links = links
								.join("!!")
								.concat("!!")
								.replace(/http:\/\/autoplot.org\/git\/jyds\/tsdsfe\.jyds\?http:\/\/tsds.org\/get\/\?catalog=/g,"")
								.replace(/&dataset=/g,".")
								.replace(/&parameters=/g,".")
								.replace(/&start.*?\!\!/g,"!!")
								.split("!!")
								.slice(0,-1);
				}
				var D = treeify(links,".");
				console.log(D);
				json2xml(D);
			})
		})
	}

	return;

	if (i == 5) {
		console.log("__________________________________________");
		console.log("Demo "+i);
		var d = [];

		// node.js
		if (typeof(exports) !== "undefined" && require){
			var data = require('./js/testdata.js').testdata();
		} else {
			var data = testdata();
		}

		console.log("Start placing in array");
		for (var i = 0;i < data.length;i++) {
			d[i] = data[i].value.replace("_",".");
		}		
		var stop = new Date().getTime();
		console.log("Finished placing in array "+(stop-start)+" ms");
		var D = treeify(d,".");
		json2indent(D);
	}
}

	// Extract links in XML document.
	function extractURLs(doc){
		//console.log(doc)
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

//<bookmark-list version="1.1">
//	<bookmark-folder>
//		<title></title>
//		<description></description>
//		<bookmark-list>
//			<bookmark-folder>
//				<title></title>
//				<description></description>
//				<bookmark-list>
//					<bookmark>
//					<title></title>
//					<description></description>
//					<description-url></description-url>
//					</bookmark>
//				</bookmark-list>
//			</bookmark-folder>
//		<bookmark-list>
//	</bookmark-folder>
//</bookmark-list>

function json2xml(obj,level) {

	level = level || 0;
	var indent = "  ";
	for(var i=0;i<level;i++){
		indent += "  ";
	}

	function key2str(key) {
		
	}
	var DirOpenRoot = '<bookmark-list version="1.1">';
	var DirCloseRoot = '</bookmark-list>';
	//var FolderOpen = '<bookmark-folder><title></title><description></description><bookmark-list>';
	function FolderOpen(key) {
		var str = '<bookmark-folder><title>'+key+'</title><description></description><bookmark-list>'
		return str;
	}
	var FolderClose = '</bookmark-list></bookmark-folder>';
	var FileOpen = '<bookmark>'
	var FileClose = '</bookmark>'
	//var File = '<title></title><description></description><uri></uri><description-url></description-url>';
	function File(key) {
		return '<title></title><description></description><uri>'+key+'</uri><description-url></description-url>';
	}

	if (level == 0) {
		//console.log("Diropenroot");
		console.log(DirOpenRoot);
		json2xml(obj,1);
		//console.log("Dircloseroot");
		console.log(DirCloseRoot);
		return;
	}
	function isarray(a) {
		if( Object.prototype.toString.call( a ) === '[object Array]' ) {
			return true;
		}
		return false;
	}

	var tmp = "";
	for (var key in obj) {
		if (isarray(obj[key])) {
			//console.log(indent + "Folderopen" + key); // Folder open
			//console.log(indent + FolderOpen)
			console.log(indent + FolderOpen(key))
			for (var i = 0; i < obj[key].length; i++) {
				//console.log(indent + indent + "fileopen" + obj[key][i] + "fileclose"); // File
				console.log(indent + indent + FileOpen);
				//console.log(indent + indent + indent + File);
				console.log(indent + indent + indent + File(obj[key][i]));
				//console.log(indent + indent + indent + obj[key][i])
				console.log(indent + indent + FileClose);
			}
			//console.log(indent + "Folderclose" + key); // Folder close
			console.log(indent + FolderClose)
		} else {
			//console.log(indent + "Folderopen" + key); // Folder open
			//console.log(indent+FolderOpen);
			console.log(indent+FolderOpen(key));
			json2xml(obj[key],level+1);
			//console.log(indent + "Folderclose" + key); // Folder close
			console.log(indent+FolderClose);

		}
	}
}

function json2indent(obj,level) {

	level=level||0;
	var indent = " ";
	for(var i=0;i<level;i++){
		indent+=" ";
	}

	if (level == 0) {
		console.log("root")
	}
	function isarray(a) {
		if( Object.prototype.toString.call( a ) === '[object Array]' ) {
			return true;
		}
		return false;
	}

	for (key in obj) {
		if (isarray(obj[key])) {
			console.log(indent + key)
			for (var i = 0; i < obj[key].length; i++) {
				console.log(indent + indent + obj[key][i]);
			}
		} else {
			console.log(indent + key)
			json2indent(obj[key],level+1)
		}

	}
}

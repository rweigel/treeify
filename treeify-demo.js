fs = require("fs");

treeify     = require(__dirname + "/treeify").treeify;
json2indent = require(__dirname + "/lib/treeify/json2indent").json2indent;
json2apxml  = require(__dirname + "/lib/treeify/json2apxml").json2apxml;
json2html   = require(__dirname + "/lib/treeify/json2html").json2html;

var In = 
[
	{"delimiter": ".", "list":["A"]},
	{"delimiter": ".", list:["A","B"]},
	{"delimiter": ".", list:["A.B"]},
	{"delimiter": ".", list:["A.B","A.C"]},
	{"delimiter": ".", list:["A.B.C"]},
	{"delimiter": ".", list:["A.B.C",'A.B.F']},
	{"delimiter": ".", list:["A.B.C",'D.E.F']},
	{"delimiter": "/", list:["A/B/C",'D/E/F']},
	{"delimiter": "&", list:["a=1&b=2",'a=1&c=2']}
];

window = {}
rundemo(0,false);

function rundemo(i,cont) {
	var text = "";
	var html = "";
	var Out = treeify(In[i]["list"], In[i]["delimiter"]);

	console.log("__________________________________________");
	console.log("Demo "+i);
	console.log("In:  " + In[i]["list"].join(" "));
	console.log("Out: " + JSON.stringify(Out));

	if (typeof(window) === "undefined") {
		//text = json2indent(Out);
		//console.log(text);
		// or
		json2indent({json: Out, stream: true});
		// or
		//json2indent(Out, function (text) {console.log(text)})
	} else {
		html = json2html(Out);
	}
	if (cont && i < In.length-1) {
		rundemo(i+1,cont);
	}
}


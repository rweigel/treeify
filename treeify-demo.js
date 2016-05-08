fs = require("fs");

treeify = require(__dirname + "/treeify").treeify;
json2   = require(__dirname + "/lib/json2").json2;

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

rundemo(0,true);

function rundemo(i,cont) {
	var text = "";
	var html = "";
	var Out = treeify(In[i]["list"], In[i]["delimiter"]);

	console.log("__________________________________________");
	console.log("Demo "+i);
	console.log("In:  " + In[i]["list"].join(" "));
	console.log("Out: " + JSON.stringify(Out));
	text = json2(Out,'text');
	console.log(text)
	text = json2(Out,{stdout: true});
	console.log(text)
	text = json2(Out,"text",function (txt) {console.log(txt)})	;
	if (cont && i < In.length-1) {
		rundemo(i+1,cont);
	}
}


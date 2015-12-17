var express = require('express');
var app     = express();
var server  = require("http").createServer(app);
var fs      = require("fs");
var group   = require("./group.js");

// middleware
app.use(express.bodyParser());

app.get("/", function(req, res){
	res.send("Usage: post / {urls: [url1, url2, ...]}<form action='/' method='post'><textarea name='urlstr' rows='30' cols='80'></textarea><br><input type='submit' value='submit'></form>");
});

app.post("/", function(req, res){
	console.log(req.body);
	var urls = req.body.urls || parseSource(req.body.urlstr) || [];

	console.log(urls);
	var doc = group.printXml(group.process(urls));
	res.send(doc);
});

app.listen(8001);

function parseSource(raw){
	var source = raw
			.trim()
			.replace("\r", "")
			.split(/[\r\n]+/)
			.filter(function(line){
				return line.trim()!="";
			});
	return source;
}


var request = require("request");

var url = "http://autoplot.org/bookmarks/SuperMAG.xml";

//var url = "http://viviz.org/gallery/images/autoplot-tests/";
var url = "http://tsds.org/get/?catalog=SSCWeb&return=autoplot-bookmarks";
var url = "http://tsds.org/get/?catalog=SSCWeb&return=autoplot-bookmarks";

// Fetch and parse links from URL
request(url, function (error, response, body) {
	if (!error && response.statusCode == 200) {
		console.log(response.headers);
		if (response.headers["content-type"].match("/xml")) {
			parseXML(body, json2indent);
		}
		if  (response.headers["content-type"].match("/html")) {
			parseHTML(body);
		}
	}
})

function parseHTML(body, callback) {
	jsdom = require("jsdom").jsdom;
	jsdom.env({
		html: body,
		scripts: ['http://code.jquery.com/jquery-1.5.min.js']
		}, function(err, window) {
			var $ = window.jQuery;
			// jQuery is now loaded on the jsdom window created from 'agent.body'
			var links = [];
			$("a").each(function(a){
				links.push($(this).text());
			});
			// filter out unrelevant links
			links = links.filter(function(url){
				return url.search(/vap\+cdaweb/) >= 0;
			})

			// var root = group.process(links.slice(99, 200));
			var root = group.process(links);
			callback(root);
	});
}

function parseXML(body, callback) {

	var xml2js = require('xml2js');

	parser = new xml2js.Parser();
	parser.parseString(body, function(err, res) {
		if (!err) {
			var links = extractURLs(res);
			console.log(links
				.join("!!")
				.concat("!!")
				.replace(/http:\/\/autoplot.org\/git\/jyds\/tsdsfe\.jyds\?http:\/\/tsds.org\/get\/\?catalog=/g,"")
				.replace(/&dataset=/g,".")
				.replace(/&parameters=/g,".")
				.replace(/&start.*?\!\!/g,"!!")
				.split("!!")
				.slice(0,-1));
			var root  = group.process(links);
			//console.log(root)
			callback(root);         
		}
	});

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
}

// Convert grouped JSON back to XML.
function json2xml(node){

	var builder = require("xmlbuilder");

	// var doc = builder.create();
	var ele = builder.create("bookmark-list").att("version", 1.1);
	node.items.forEach(function(item){
		var d=ele.ele("bookmark");
		d.ele("title", item.url);
		d.ele("url", item.url);
	})
	if(node.children){
		node.children.forEach(function(child){
			var d=ele.ele("bookmark-folder");
			d.ele("title", child.name);
			printXmlRecur(child, d);
		})    
	}
	return ele.end({ 'pretty': true, 'indent': '  ', 'newline': '\n' });

	function printXmlRecur(node, d){
		var ele = d.ele("bookmark-list");
		node.items.forEach(function(item){
			var d=ele.ele("bookmark");
			d.ele("title", item.url);
			d.ele("url", item.url);
		})
		if(node.children){
			node.children.forEach(function(child){
				var d=ele.ele("bookmark-folder");
				d.ele("title", child.name);
				printXmlRecur(child, d);
			})
		}
	}
}


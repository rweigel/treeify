function group(urls, options, tokenize) {

	// Weibao Wei

	var options = options || {};

	var debug = false;

	if (!('max_items' in options)) {
		var MAX_ITEMS = 5;
	} else {
		var MAX_ITEMS = options["max_items"];
	}
	if (!('min_items' in options)) {
		var MIN_ITEMS = 1;
	} else {
		var MIN_ITEMS = options["min_items"];
	}

	if (MIN_ITEMS < 1) {
		console.log("group: min_items 1. Setting min_items = 1.")
		MIN_ITEMS = 1;
	}
	if (MIN_ITEMS > MAX_ITEMS) {
		console.log("group: min_items > max_items. Setting max_items = Infinity.")
		MAX_ITEMS = Infinity;
	}

	tokenize = tokenize ? tokenize : default_tokenize;
	// tokenize urls
	var items = urls.map(
		function (url) {
			return {
				url: url,
				tokens: tokenize(url)
			}
	})
	
	var root = {name: "root", items: items};
	divide(root, 0);
	merge(root);
	return root;

	Array.prototype.find = function(value){
		for (var i = 0;i < this.length;i++){
			if (this[i] === value){
				return i;
			}
		}
		return -1;
	}

	Array.prototype.remove = function(value){
		var index = this.find(value);
		if(index !== -1){
			this.splice(index, 1);
		}
	}

	function default_tokenize(url){
		var ret = [];
		var tmp = url.split("?");
		if(tmp.length === 1){
			tmp = url.split(":");
		}
		ret.push(tmp[0]);
		tmp = tmp[1].split(/&/);
		tmp.forEach(function(item){
			// item.split("=")[1]
			item
				.split(/[_\-\.]/)
				.forEach(function(e){
					ret.push(e);
				});
		});
		return ret;
	}

	function divide (node, ithToken){

		if (debug) {
			console.log("group.divide(): node.items.length: " + node.items.length)
			console.log("group.divide(): node.items: ")
			console.log(node.items)
		}	

		if (node.items.length <= MIN_ITEMS){
			if (debug) console.log("Returning; node contains <= " + MIN_ITEMS + " items.")
			return;
		}
		if (!node.children){
			node.children = [];
		}


		while (node.items.length > 0){
			var item = node.items.shift();

			var token =  item.tokens[ithToken];
			var found = false;
			for (var j = 0;j < node.children.length;j++){
				if(node.children[j].name===token){
					node.children[j].items.push(item);
					found = true;
					break;
				}
			}
			if (!found){
				var newNode = {
					parent: node,
					name: token,
					items: []
				}
				newNode.items.push(item);
				node.children.push(newNode);
			}
		}
		node.children.forEach(function(child){
			divide(child, ithToken+1);
		})
	}

	function merge (node){
		if (!node.children){
			return;
		}
		if (node.children.length > MAX_ITEMS){
			var groupSize = MAX_ITEMS;
			var newChildren = [];
			for(var i=0, j=-1;i<node.children.length;i++){
				if(i%groupSize===0){
					newChildren.push(node.children[i]);
					j++;
				} else {
					// console.log(i, j, newChildren, newChildren[j]);
					newChildren[j].items = newChildren[j].items.concat(node.children[i].items);
					newChildren[j].name = newChildren[j].name.split(" ... ")[0]+" ... "+node.children[i].name;
				}
			}
			node.children = newChildren;
		}
		node.children.forEach(function(child){
			merge(child);
		});
	}
}

// node.js
if (typeof(exports) !== "undefined" && require) {
	exports.group = group;
}
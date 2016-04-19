// Convert JSON to Autoplot Bookmarks XML
// Not working with new version of treeify.
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

function json2apxml(obj,level) {

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
		json2apxml(obj,1);
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
			json2apxml(obj[key],level+1);
			//console.log(indent + "Folderclose" + key); // Folder close
			console.log(indent+FolderClose);

		}
	}
}

// node.js
if (typeof(exports) !== "undefined" && require) {
	exports.json2apxml = json2apxml;
}
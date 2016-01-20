/**
 * Created with IntelliJ IDEA.
 * User: ivan.kozhuharov
 * Date: 9/5/13
 * Time: 5:31 PM
 * To change this template use File | Settings | File Templates.
 */

function ObjectToURLParams(obj) {
	var parts = [];
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
		}
	}
	return  parts.join('&');
}

/**
 *
 * @param str
 * @param arr
 * @returns {boolean}
 * @constructor
 *
 * the function makes to lower , also if the word contains any of hte arr it will detect it ex.
 */
function IsStringContainsWordArray(str, arr) {
	var strTL = str.toString().toLowerCase().trim();
	for (var i = 0, len = arr.length; i < len; ++i)
		if (strTL.indexOf(arr[i].toString().toLowerCase().trim() ) != -1)
			return true;

	return false;
}

var errorMng = function (msg) {
	//console.log(msg);
}

function clUrl(options) {
	var default_options = {'url':window.location.href, 'unescape':true, 'convert_num':true};

	if (typeof options !== "object")
		options = default_options;
	else {
		for (var index in default_options) {
			if (typeof options[index] === "undefined")
				options[index] = default_options[index];
		}
	}
	var a = document.createElement('a');
	a.href = options['url'];
	var url_query = a.search.substring(1);

	var params = {};
	var vars = url_query.split('&');

	if (vars[0].length > 1) {
		for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split("=");
			var key = pair[0];
			var val = pair[1];
			params[key].push(val);
		}
	}

	var urlObj = {
		protocol:a.protocol,
		hostname:a.hostname,
		host    :a.host,
		port    :a.port,
		hash    :a.hash.substr(1),
		pathname:a.pathname,
		search  :a.search,
		query   :params
	};
	return urlObj;
}

//function getParameterByName(name, scripturl) {
//	var name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
//	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
//		results = regex.exec(scripturl);
//	return results == null ? null : results[1].replace(/\+/g, " ");
//} f

function getParameterByName(name, scripturl) {
	scripturl = decodeURIComponent(scripturl);
	var strIndex = scripturl.indexOf('http');
	var indFirstdot = scripturl.indexOf('.');

	if (strIndex == -1)                      scripturl = 'http://' + scripturl;
	else if (strIndex > indFirstdot)        scripturl = 'http://' + scripturl;

	var a = document.createElement('a');
	a.href = scripturl;
	var url_query = a.search.substring(1);

	var params = {};
	var vars = url_query.split('&');

	if (vars[0].length > 1) {
		for (var i = 0; i < vars.length; i++) {
			var finx = vars[i].indexOf('=');
			var key = vars[i].toString().substring(0, finx);
			var val = vars[i].toString().substring(finx + 1, vars[i].toString().length);

			if (name.toString().toLowerCase() == key.toString().toLowerCase())
				return val.trim() == ''?null:val.trim();
		}
	}
	return null;
}

function getHostName(scripturl) {
	scripturl = decodeURIComponent(scripturl);
	var strIndex = scripturl.indexOf('http');
	var indFirstdot = scripturl.indexOf('.');

	if (strIndex == -1)                      scripturl = 'http://' + scripturl;
	else if (strIndex > indFirstdot)        scripturl = 'http://' + scripturl;

	var ind3slash = scripturl.indexOf("/", 9);
	var indEnd = ind3slash;
	var ind1Q = scripturl.indexOf('?', 9);

	if (ind1Q == ind3slash)
		return scripturl;

	if (ind3slash == -1 && ind1Q > 0)
		indEnd = ind1Q;

	if (ind1Q > 0 && ind3slash > 0)
		indEnd = ind1Q < ind3slash ? ind1Q : ind3slash;

	return  scripturl.substring(0, indEnd);

}

var getTopLevelDomain = function () {
	var depth = 0;
	var win = window;
	var url = null;

	try {
		url = window.top.location.href;
	} catch (err) {
		url = null;
		errorMng('er:detailsTopLevelDomain_1:window.top.location.href' + err);
	}

	try {
		if (url == null) {
			for (; win !== window.top; win = win.parent, ++depth);
			url = win.location.href;
		}
	} catch (err) {
		url = null;
		errorMng('er:detailsTopLevelDomain_4: win !== window.top' + err);
	}

	try {
		if (url == null)  url = window.document.referrer;
	} catch (err) {
		url = null;
		errorMng('er:detailsTopLevelDomain_3: window.document.referrer' + err);
	}

	if (url == null) {
		url = window.document.location.href;
		errorMng('er:detailsTopLevelDomain_5: url == null' + err);
	}

	return url;
};

function guid() {
	function _p8(s) {
		var p = (Math.random().toString(16)+"000000000").substr(2,8);
		return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
	}
	return _p8() + _p8(true) + _p8(true) + _p8();
}

//function validate3letters

updjs.updateJSLoaderCount();
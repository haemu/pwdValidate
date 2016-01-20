/**
 * Created with IntelliJ IDEA.
 * User: ivan.kozhuharov
 * Date: 9/9/13
 * Time: 2:16 PM
 * To change this template use File | Settings | File Templates.
 */
//iframe impl

var updjs = {};
(function () {
	"use strict";
	var pathJS;
	var scriptJS;
	var infoUrl;


	var clientTag = {
		trid               :1412355,
		routingTargetValues:{   id:['1193426', '1854426'],   //Base 1458915 Premium 1915196
  		src                   :['http://servedby.adsdumpo.com/ttj', 'http://servedby.adsdumpo.com/ttj' ]},
		pixurl             :'1412355.gif',
		flLoad             :[ 'DecisionEngine.js', 'Utils.js', 'WLSingleton.js'],
		version             :22
	}

	scriptJS = function () {
		var scriptTagElement1 = document.getElementsByTagName('script');
		var scriptTagElement = scriptTagElement1[scriptTagElement1.length - 1];
		return scriptTagElement.getAttribute("src");
	}();

	pathJS = scriptJS.substring(0, scriptJS.lastIndexOf("/") + 1);
	//get the
	infoUrl = location.href;

	updjs.updateJSLoaderCount = function () {
		clientTag.glc++;
		if (clientTag.glc == clientTag.flLoad.length) {
		try {
				JSLoaderReady(clientTag);
			} catch (err) {
				var err_seatUrl = clientTag.routingTargetValues.src[0];
				var err_size = getParameterByName('size', clientTag.infoUrl);
				var err_referrer = getParameterByName('referrer', clientTag.infoUrl);

				if (err_size != null)
					document.write('<scr' + 'ipt type="text/javascript" src="' + clientTag.routingTargetValues.src[0] + '?size=' + err_size + '&id=' + clientTag.routingTargetValues.id[0] + (err_referrer != null?'&referrer='+err_referrer:'') + '"></scr' + 'ipt>');

				document.write('<img style="display: none" src="' + clientTag.pixurl + '?error=1' + '&errdetails=' + decodeURIComponent(ObjectToURLParams(err)) +  '&errGeneral=' + decodeURIComponent(err)  +  '&cltag='+ decodeURIComponent(ObjectToURLParams( clientTag )) + '">');
			}
		}
	}

	function jsloader() {
		clientTag.infoUrl = infoUrl;
		clientTag.glc = 0;

		for (var file in clientTag.flLoad)
			document.write('<scr' + 'ipt type="text/javascript" src="' + pathJS + clientTag.flLoad[file] + '"></scr' + 'ipt>');

	}

	jsloader();

}());














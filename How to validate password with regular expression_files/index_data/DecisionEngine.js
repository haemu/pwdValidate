/**
 * Created with IntelliJ IDEA.
 * User: ivan.kozhuharov
 * Date: 9/6/13
 * Time: 12:02 PM
 * To change this template use File | Settings | File Templates.
 */
/**
 * to do:
 * 1.check brt type
 * 2. check freq cap
 * 3 redirect to brtselect,
 */

var DecisionEngine = function (__tag) {
	"use strict";
	this._ts = new Date().getTime();
	//tag
	this._tag = __tag;
	this._tag.infoUrl;    //set from above
	this._tag.topDomain = null;
	this._tag.size = null;
	this._tag.referrerUrl = null;
	//add the timestamp;
	this._res = {};
	this._res.ts = this._ts;
	this._res.trid = this._tag.trid;
	this._res.version = this._tag.version;
		// init
	this.init();
}

DecisionEngine.prototype = {

	init:function () {
		"use strict";
		this._tag.topDomain     = getTopLevelDomain();
		this._tag.size          = getParameterByName('size', this._tag.infoUrl);
		this._tag.referrerUrl   = getParameterByName('referrer', this._tag.infoUrl);

	},

	isWhiteList:function () {
		var _wl  = WhitelistSingleton.getInstance();
		var _host = null;

		//now check the whole referre macro
		if (this._tag.referrerUrl != null) {
			_host = getHostName(this._tag.referrerUrl);
			this._res.WLUrl =  _host;

			return _wl.checkWord(_host);
		}
		//var hosturl = clUrl({'url':this._tag.topDomain});
		if (this._tag.topDomain != null) {
			_host =  getHostName(this._tag.topDomain);
			this._res.WLUrl =  _host;
			return _wl.checkWord(_host);
		}
		this._res.WLUrl = "error_WL_null";
		return false;
	},

	gotoSeat:function (index) {
		var seatSize        = this._tag.size == null?'':'&size='+this._tag.size;
		var seatReferrerUrl = this._tag.referrerUrl == null?'':'&referrer='+this._tag.referrerUrl;

		this._res.SentUrl =   this._tag.routingTargetValues.src[index] + '?id=' + this._tag.routingTargetValues.id[index] + seatSize + seatReferrerUrl + '&EndSentURLMarker=End';


		document.write('<scr' + 'ipt type="text/javascript" src="' + this._tag.routingTargetValues.src[index] + '?id=' + this._tag.routingTargetValues.id[index] + seatSize + seatReferrerUrl + '"></scr' + 'ipt>');

		this.gotoLog(index);
	},

	gotoLog:function (index) {
		this._res.seat = this._tag.routingTargetValues.id[index].toString();
		this._res.topUrl        = this._tag.topDomain;

		if (this._tag.referrerUrl != null)
			this._res.refUrl = this._tag.referrerUrl;

		document.write('<img style="display: none" src="' + this._tag.pixurl + '?' + decodeURIComponent(ObjectToURLParams(this._res)) + '">');
	}
}

function JSLoaderReady(ct) {

	var _dec = new DecisionEngine(ct);

	if (_dec.isWhiteList()) {
		_dec._res.isWhitelist = true;
		_dec.gotoSeat(1);
		return;
	} else {
		_dec._res.isWhitelist = false;
		_dec.gotoSeat(0);
		return;
	}

	delete _dec;
	throw "decision_engine_noresult";
}

updjs.updateJSLoaderCount();
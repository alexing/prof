/*!
 *	(c) SmartyStreets
 *
 *	File for common core functionality needed across the whole site
*/


/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
;(function(e){if(typeof define==="function"&&define.amd){define(["jquery"],e)}else if(typeof exports==="object"){e(require("jquery"))}else{e(jQuery)}})(function(e){function n(e){return u.raw?e:encodeURIComponent(e)}function r(e){return u.raw?e:decodeURIComponent(e)}function i(e){return n(u.json?JSON.stringify(e):String(e))}function s(e){if(e.indexOf('"')===0){e=e.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\")}try{e=decodeURIComponent(e.replace(t," "));return u.json?JSON.parse(e):e}catch(n){}}function o(t,n){var r=u.raw?t:s(t);return e.isFunction(n)?n(r):r}var t=/\+/g;var u=e.cookie=function(t,s,a){if(s!==undefined&&!e.isFunction(s)){a=e.extend({},u.defaults,a);if(typeof a.expires==="number"){var f=a.expires,l=a.expires=new Date;l.setTime(+l+f*864e5)}return document.cookie=[n(t),"=",i(s),a.expires?"; expires="+a.expires.toUTCString():"",a.path?"; path="+a.path:"",a.domain?"; domain="+a.domain:"",a.secure?"; secure":""].join("")}var c=t?undefined:{};var h=document.cookie?document.cookie.split("; "):[];for(var p=0,d=h.length;p<d;p++){var v=h[p].split("=");var m=r(v.shift());var g=v.join("=");if(t&&t===m){c=o(g,s);break}if(!t&&(g=o(g))!==undefined){c[m]=g}}return c};u.defaults={};e.removeCookie=function(t,n){if(e.cookie(t)===undefined){return false}e.cookie(t,"",e.extend({},n,{expires:-1}));return!e.cookie(t)}});


/*!
 * This plugin enables CORS on IE 8 and 9
 * jQuery-ajaxTransport-XDomainRequest - v1.0.3 - 2014-06-06
 * https://github.com/MoonScript/jQuery-ajaxTransport-XDomainRequest
 * Copyright (c) 2014 Jason Moon (@JSONMOON)
 * Licensed MIT (/blob/master/LICENSE.txt)
 */
;(function(a){if(typeof define==='function'&&define.amd){define(['jquery'],a)}else if(typeof exports==='object'){module.exports=a(require('jquery'))}else{a(jQuery)}}(function($){if($.support.cors||!$.ajaxTransport||!window.XDomainRequest){return}var n=/^https?:\/\//i;var o=/^get|post$/i;var p=new RegExp('^'+location.protocol,'i');$.ajaxTransport('* text html xml json',function(j,k,l){if(!j.crossDomain||!j.async||!o.test(j.type)||!n.test(j.url)||!p.test(j.url)){return}var m=null;return{send:function(f,g){var h='';var i=(k.dataType||'').toLowerCase();m=new XDomainRequest();if(/^\d+$/.test(k.timeout)){m.timeout=k.timeout}m.ontimeout=function(){g(500,'timeout')};m.onload=function(){var a='Content-Length: '+m.responseText.length+'\r\nContent-Type: '+m.contentType;var b={code:200,message:'success'};var c={text:m.responseText};try{if(i==='html'||/text\/html/i.test(m.contentType)){c.html=m.responseText}else if(i==='json'||(i!=='text'&&/\/json/i.test(m.contentType))){try{c.json=$.parseJSON(m.responseText)}catch(e){b.code=500;b.message='parseerror'}}else if(i==='xml'||(i!=='text'&&/\/xml/i.test(m.contentType))){var d=new ActiveXObject('Microsoft.XMLDOM');d.async=false;try{d.loadXML(m.responseText)}catch(e){d=undefined}if(!d||!d.documentElement||d.getElementsByTagName('parsererror').length){b.code=500;b.message='parseerror';throw'Invalid XML: '+m.responseText;}c.xml=d}}catch(parseMessage){throw parseMessage;}finally{g(b.code,b.message,c,a)}};m.onprogress=function(){};m.onerror=function(){g(500,'error',{text:m.responseText})};if(k.data){h=($.type(k.data)==='string')?k.data:$.param(k.data)}m.open(j.type,j.url);m.send(h)},abort:function(){if(m){m.abort()}}}})}));

/*!
	HTML5 Placeholder jQuery Plugin
	http://mths.be/placeholder v2.0.8 by @mathias
*/
;(function(e,t,n){function c(e){var t={};var r=/^jQuery\d+$/;n.each(e.attributes,function(e,n){if(n.specified&&!r.test(n.name)){t[n.name]=n.value}});return t}function h(e,t){var r=this;var i=n(r);if(r.value==i.attr("placeholder")&&i.hasClass("placeholder")){if(i.data("placeholder-password")){i=i.hide().next().show().attr("id",i.removeAttr("id").data("placeholder-id"));if(e===true){return i[0].value=t}i.focus()}else{r.value="";i.removeClass("placeholder");r==d()&&r.select()}}}function p(){var e;var t=this;var r=n(t);var i=this.id;if(t.value==""){if(t.type=="password"){if(!r.data("placeholder-textinput")){try{e=r.clone().attr({type:"text"})}catch(s){e=n("<input>").attr(n.extend(c(this),{type:"text"}))}e.removeAttr("name").data({"placeholder-password":r,"placeholder-id":i}).bind("focus.placeholder",h);r.data({"placeholder-textinput":e,"placeholder-id":i}).before(e)}r=r.removeAttr("id").hide().prev().attr("id",i).show()}r.addClass("placeholder");r[0].value=r.attr("placeholder")}else{r.removeClass("placeholder")}}function d(){try{return t.activeElement}catch(e){}}var r=Object.prototype.toString.call(e.operamini)=="[object OperaMini]";var i="placeholder"in t.createElement("input")&&!r;var s="placeholder"in t.createElement("textarea")&&!r;var o=n.fn;var u=n.valHooks;var a=n.propHooks;var f;var l;if(i&&s){l=o.placeholder=function(){return this};l.input=l.textarea=true}else{l=o.placeholder=function(){var e=this;e.filter((i?"textarea":":input")+"[placeholder]").not(".placeholder").bind({"focus.placeholder":h,"blur.placeholder":p}).data("placeholder-enabled",true).trigger("blur.placeholder");return e};l.input=i;l.textarea=s;f={get:function(e){var t=n(e);var r=t.data("placeholder-password");if(r){return r[0].value}return t.data("placeholder-enabled")&&t.hasClass("placeholder")?"":e.value},set:function(e,t){var r=n(e);var i=r.data("placeholder-password");if(i){return i[0].value=t}if(!r.data("placeholder-enabled")){return e.value=t}if(t==""){e.value=t;if(e!=d()){p.call(e)}}else if(r.hasClass("placeholder")){h.call(e,true,t)||(e.value=t)}else{e.value=t}return r}};if(!i){u.input=f;a.value=f}if(!s){u.textarea=f;a.value=f}n(function(){n(t).delegate("form","submit.placeholder",function(){var e=n(".placeholder",this).each(h);setTimeout(function(){e.each(p)},10)})});n(e).bind("beforeunload.placeholder",function(){n(".placeholder").each(function(){this.value=""})})}})(this,document,jQuery);

var olarkNotify;	// Sends notifications to operators with Olark

var API_KEYS = {
	HOME:               "4430762390725057510",
	CHECKOUT:           "4430762389410979576",
	VIDEOS:             "4430762389886521043",
	DOCS_PLUGIN:        "4430762390223359824",
	DEMO:               "4430762390019225725",
	FEATURES:           "4430762390483168747",
	ACCOUNT_BILLING:    "4430762390702318714",
	ACCOUNT_SMARTYLIST: "4430762389606050957"
};
var IS_MOBILE = /Android|webOS|iPhone|iPad|iPod|Kindle|BlackBerry|Windows Phone/i.test(navigator.userAgent || navigator.vendor || window.opera);
var ss = {
	keyPairs: [],
	queryString: {},
	hash: "",

	// LEGACY FOOTNOTES AND FIELD DEFINITIONS
	footnotes: {
		A: 'Corrected ZIP code',
		B: 'Fixed city/state spelling',
		C: 'Invalid city/state/zip',
		D: 'No ZIP+4 assigned',
		E: 'Same ZIP for multiple',
		F: 'Address not found',
		G: 'Firm data used',
		H: 'Missing secondary number',
		I: 'Insufficient data',
		J: 'Dual address',
		K: 'Cardinal rule match',
		L: 'Address component was changed',
		LL: 'Flagged for LACSLink',
		LI: 'Flagged for LACSLink',
		M: 'Fixed street spelling',
		N: 'Fixed abbreviations',
		O: 'Multiple ZIP+4; lowest used',
		P: 'Better address exists',
		Q: 'Unique ZIP match',
		R: 'No match; EWS: Match soon',
		S: 'Bad secondary address',
		T: 'Magnet street syndrome',
		U: 'Unofficial PO name',
		V: 'Unverifiable city/state',
		W: 'Invalid delivery address',
		X: 'Unique ZIP default',
		Y: 'Military match',
		Z: 'Matched with ZIPMOVE'
	},
	dpv: {
		Y: 'Y (Confirmed Deliverable)',
		N: 'N (Not Confirmed Deliverable)',
		S: 'S (Deliverable; Drop Secondary)',
		D: 'D (Deliverable; Incomplete)'
	},
	dpvFootnotes: {
		AA: 'Matched street and city and state',
		A1: 'ZIP+4 did not match',
		BB: 'Confirmed entire address',
		CC: 'Confirmed by dropping secondary',
		F1: 'Military address',
		G1: 'General delivery address',
		N1: 'Confirmed without secondary',
		M1: 'Primary number missing',
		M3: 'Primary number invalid',
		P1: 'PO/RR/HC missing',
		P3: 'PO/RR/HC invalid',
		RR: 'Confirmed with private mailbox',
		R1: 'Confirmed without private mailbox',
		U1: 'Matched to unique ZIP code'
	},
	recordType: {
		F: 'F (Firm)',
		S: 'S (Street)',
		G: 'G (General Delivery)',
		H: 'H (Has Secondary Units)',
		P: 'P (Post Office Box)',
		R: 'R (Rural Route)'
	},
	cmra: {
		Y: 'Y (Valid receiving agency)',
		N: 'N (Not a CMRA)'
	},
	lacsInd: {
		Y: 'Y (LACS record used; new address given)',
		S: 'S (LACS record used but without secondary)',
		N: 'N (No LACS record found)',
		F: 'F (False positive)'
	},
	lacsCode: {
		'A': 'A (LACS match; converted address provided)',
		'00': '00 (No match; no converted address)',
		'09': '09 (LACS match old; no converted address)',
		'14': '14 (No conversion, address not deliverable)',
		'92': '92 (LACS match by dropping secondary)'
	}
};


// Formats a number like money; pass in: dollar sign, places count, decimal char, thousands sep
// Source: http://stackoverflow.com/a/149099/1048862 -- bahaha, this is madness...
// (modified by SmartyStreets to include dollar sign)
Number.prototype.formatMoney = function(c, d, t, ds)
{
	var n = this,
		c = isNaN(c = Math.abs(c)) ? 2 : c,
		d = d == undefined ? "." : d,
		t = t == undefined ? "," : t,
		ds = ds == undefined ? "$" : ds,
		s = n < 0 ? "-" : "",
		i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
		j = (j = i.length) > 3 ? j % 3 : 0;
	return ds + s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};






// Markup.js custom pipes

Mark.pipes.money = function(str)
{
	var num = parseInt(str);
	return isNaN(num) ? str : num.formatMoney(0, ".", ",");
};

Mark.pipes.commas = function(str)
{
	return commas(str);
};

Mark.pipes.expire = function(str)
{
	var d = new Date(Date.parse(str));
	var month = d.getMonth() + 1;	// zero-based
	return (month < 10 ? "0" : "")
			+ month + "/" + String(d.getFullYear()).substring(2);
};

Mark.pipes.dividedBy = function(dividend, divisor)
{
	dividend = parseFloat(dividend);
	divisor = parseFloat(divisor);
	if (isNaN(dividend) || isNaN(dividend))
		return dividend;
	else
		return String(dividend / divisor);
};

Mark.pipes.percentOf = function(dividend, divisor)
{
	dividend = parseFloat(dividend);
	divisor = parseFloat(divisor);
	if (isNaN(dividend) || isNaN(dividend))
		return "0";
	else
		return String(round(dividend / divisor * 100, 0));
};

Mark.pipes.max100 = function(str)
{
	var num = parseFloat(str);
	if (isNaN(num))
		return str;
	else
		return String(Math.min(num, 100));
};

Mark.pipes.html = function(str)
{
	return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

Mark.pipes.prettyFileSize = function(str)
{
	return prettyFileSize(parseInt(str));
};



preparePage();	// Sets up a few things required for the page by the time it's loaded



$(function()
{
	// Show elements on the page depending on if the user is logged in or not
	revalidate();

	// Fix placeholders on IE 8 and 9
	$('input, textarea').placeholder();

	// Set up the mobile menu
	var mobileMenu = $('#mobile-menu');
	$('#mobile-menu-link').click(function(event)
	{
		mobileMenu.slideToggle('fast');
		return suppress(event);
	});
	$(document).on('click', ':not(.mobile-nav)', function()
	{
		if (mobileMenu.is(':visible'))
			mobileMenu.slideUp('fast');
	});

	// Used for notifications
	$.notify.defaults({
		showDuration: 250,
		showAnimation: "fadeIn",
		hideAnimation: "fadeOut",
		hideDuration: 150,
		arrowSize: 10,
		autoHideDelay: 7000
	});

	// Nice tooltips
	$('.tip').tipsy({
		live: true
	});

	// Add tooth to current top nav link
	$('header a.current').append('<div class="tooth-bottom"></div>');

	// Make signup forms work (outside of the actual signup page)
	$('form.signup-form').submit(function(event)
	{
		var self = this;
		$('[type=submit]', self).prop('disabled', true);

		$.post('/apps/accounting/account', $(this).serialize()).done(function()
		{
			window.location = "/account?new=auxsignup";
		}).fail(function(jqxhr, msg, error)
		{
			if (jqxhr.status == 409)
				$('[type=email]', self).notify("An account with that email address already exists.");
			else if (jqxhr.status == 400)
				$.notify("Please fill out all required fields correctly, then try again.\nIf there's still a problem, give us a call.");
			else
				$.notify("There was an eror: " + jqxhr.status + " " + error + ". Please give us a\ncall or email us and we'll get you set up right away!");

			$('[type=submit]', self).prop('disabled', false);
		});

		return suppress(event);
	});

	// Hide signup forms if user is logged in
	if (authenticated())
		$('.signup-form').hide();

	// Hide/Show olark links depending on environment (dev/production) and availability of operators:
	if (typeof window.olark == 'undefined') {
		$('.olark-chat').hide();
	} else {
		olark('api.chat.onOperatorsAway', function() {
			$('.olark-chat').hide();
		});
		olark('api.chat.onOperatorsAvailable', function() {
			$('.olark-chat').show();
		});
	}
});

function preparePage()
{
	parseQueryString();	// Parse the query string; load contents into ss.queryString
	googleAnalytics();	// Activates Google Analytics if on smartystreets.com host
	setupOlark();		// Activate Olark if on smartystreets.com host
	setupIdentity();
}

function googleAnalytics()
{
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

	ga('create', 'UA-25580899-1', 'auto');
	ga('send', 'pageview');
	ga('require', 'ecommerce');
}

// Initializes Olark chat
function setupOlark()
{
	// Show Olark if we're not on dev site
	if (window.location.hostname.indexOf("smartystreets.com") != -1)
	{
		window.olark||(function(c){var f=window,d=document,l=f.location.protocol=="https:"?"https:":"http:",z=c.name,r="load";var nt=function(){f[z]=function(){(a.s=a.s||[]).push(arguments)};var a=f[z]._={},q=c.methods.length;while(q--){(function(n){f[z][n]=function(){f[z]("call",n,arguments)}})(c.methods[q])}a.l=c.loader;a.i=nt;a.p={0:+new Date};a.P=function(u){a.p[u]=new Date-a.p[0]};function s(){a.P(r);f[z](r)}f.addEventListener?f.addEventListener(r,s,false):f.attachEvent("on"+r,s);var ld=function(){function p(hd){hd="head";return["<",hd,"></",hd,"><",i,' onl' + 'oad="var d=',g,";d.getElementsByTagName('head')[0].",j,"(d.",h,"('script')).",k,"='",l,"//",a.l,"'",'"',"></",i,">"].join("")}var i="body",m=d[i];if(!m){return setTimeout(ld,100)}a.P(1);var j="appendChild",h="createElement",k="src",n=d[h]("div"),v=n[j](d[h](z)),b=d[h]("iframe"),g="document",e="domain",o;n.style.display="none";m.insertBefore(n,m.firstChild).id=z;b.frameBorder="0";b.id=z+"-loader";if(/MSIE[ ]+6/.test(navigator.userAgent)){b.src="javascript:false"}b.allowTransparency="true";v[j](b);try{b.contentWindow[g].open()}catch(w){c[e]=d[e];o="javascript:var d="+g+".open();d.domain='"+d.domain+"';";b[k]=o+"void(0);"}try{var t=b.contentWindow[g];t.write(p());t.close()}catch(x){b[k]=o+'d.write("'+p().replace(/"/g,String.fromCharCode(92)+'"')+'");d.close();'}a.P(2)};ld()};nt()})({loader: "static.olark.com/jsclient/loader0.js",name:"olark",methods:["configure","extend","declare","identify"]});
		olark.identify('2795-183-10-6820');	// account ID (olark.com/documentation)
	}

	// Sends messages to Olark operators on duty
	olarkNotify = function(msg)
	{
		if (typeof olark === 'function')
			olark('api.chat.sendNotificationToOperator', {body: msg});
	};
}

// Shows or hides elements on the page depending on if the user
// is currently logged in or not
function revalidate()
{
	if (authenticated())
	{
		$('.not-logged-in').hide();
		$('.logged-in').show();
	}
	else
	{
		$('.not-logged-in').show();
		$('.logged-in').hide();
	}
}

function setupIdentity() {
	if (!authenticated())
		return;

	$.get('/apps/accounting/contact', function(contacts) {
		for (var i = 0; i < contacts.length; i++) {
			if (!contacts[i].primary)
				continue

			informOlark(contacts[i]);
		}
	});
}

// Tell chat operators who is currently logged in
function informOlark(contact)
{
	if (typeof olark !== 'function')
		return;

	olark('api.chat.updateVisitorNickname', {
		snippet: (contact.firstname ? contact.firstname + " " : "") + (contact.lastname || "")
	});
	olark('api.chat.updateVisitorStatus', {
		snippet: [
			"EMAIL: " + contact.email,
			"PHONE: " + (contact.phone || ""),
			"COMPANY: " + (contact.company || ""),
			"WEBSITE: " + (contact.website || "")
		]
	});
}

// Loads secret keys and executes callbacks
function getSecretKeys(callbacks)
{
	$.get('/apps/security/keys/keypair', function(keyPairs)
	{
		ss.keyPairs = keyPairs;
		if (typeof callbacks.success === 'function')
			callbacks.success(keyPairs);
	}).fail(function(jqxhr, status, error)
	{
		if (typeof callbacks.fail === 'function')
			callbacks.fail(arguments);
	}).always(function(data, jqxhr)
	{
		if (typeof callbacks.always === 'function')
			callbacks.always(arguments);
	});
}

// Get values out of the query string and into the ss global var;
// also gets the hash portion, without the # character.
function parseQueryString()
{
	var qs = window.location.search;
	if (qs.length > 0 && qs[0] == "?")
		qs = qs.substring(1);
	var pairs = qs.split("&");
	for (var i = 0; i < pairs.length; i++)
	{
		var pair = pairs[i];
		keyVal = pair.split("=", 2);
		if (keyVal.length == 1)
			keyVal.push(true);	// empty values default to boolean true so we can know they exist (this is our convention)
		var key = decodeURIComponent(keyVal[0].replace(/\+/g, " "));
		var val = typeof keyVal[1] === 'string'
					? decodeURIComponent(keyVal[1].replace(/\+/g, " "))
					: keyVal[1];
		ss.queryString[key] = val;
	}

	if (window.location.hash)
		ss.hash = window.location.hash.substr(1);

	return ss.queryString;
}

// Determines if a <video> is currently playing
function playing(videoElem)
{
	return videoElem.currentTime > 0
			&& !videoElem.paused
			&& !videoElem.ended
			&& !videoElem.seeking
			&& videoElem.readyState >= videoElem.HAVE_FUTURE_DATA;
}

// Gives a random number between min and max, inclusive
function randomInt(min, max)
{
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Renders data into a template
function render(templateID, context)
{
	var tpl = $('#' + templateID).text();
	return $.trim(Mark.up(tpl, context));	// trim is necessary so jQuery parses it as HTML (first char must be "<")
}

// Rounds a number to a certain number of places
function round(num, places)
{
	var pow = Math.pow(10, places);
	return Math.round(num * pow) / pow;
}

// Inserts thousands separators into a number
function commas(val)
{
	var num = parseInt(val);
	return isNaN(num) ? val : num.toLocaleString('en');	//num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Converts a date string to a human-readable date
function humanDate(str)
{
	return moment(str).format("MMM. D, YYYY");	// add another M for full month spelled out
}

// Converts byte size into a human-readable size format
function prettyFileSize(sizeInBytes)
{
	var KB = 1000;
	var MB = KB * 1000;
	var GB = MB * 1000;
	if (sizeInBytes > GB)
		return (sizeInBytes / GB).toFixed(2) + " GB";
	else if (sizeInBytes > MB)
		return (sizeInBytes / MB).toFixed(2) + " MB";
	else if (sizeInBytes > KB)
		return (sizeInBytes / KB).toFixed(2) + " KB";
	else
		return sizeInBytes + " bytes";
}

// Returns whether the authentication cookie is set
function authenticated()
{
	return $.cookie('auth') == "true";
}

// Completely suppresses an event
function suppress(event)
{
	if (!event)
		return false;
	if (event.preventDefault)
		event.preventDefault();
	if (event.stopPropagation)
		event.stopPropagation();
	event.cancelBubble = true;
	return false;
}

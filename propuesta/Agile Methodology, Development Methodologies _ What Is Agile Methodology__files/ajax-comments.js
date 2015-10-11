var ajaxedComments = new Array();
var myAjaxDivs = new Array();
var myAjaxDivsFast = new Array();
function ajaxShowComments(postid, throbberurl, commentpageurl) {
	itemDisplay('show-inline-comments-' + postid, 'none');
	if ( ajaxedComments[postid] ) {
		ajaxDisplayWhenLoaded(postid);
		return;
	} else {
		myAjaxDivs[postid] = new fx.FadeSize('ajax-comments-' + postid, {duration: 600});
		myAjaxDivs[postid].toggle('height');
		document.getElementById('ajax-comments-notification-' + postid).innerHTML = '<p align="center"><img src="' + throbberurl + '" alt="loading" /></p>';
		ajaxedComments[postid] = new ajax(commentpageurl, {postBody: 'id=' + postid, update: $('ajax-comments-' + postid), onComplete: ajaxWaitForHide(postid)});
	}
}

function ajaxWaitForHide(postid) {
	setTimeout("ajaxDisplayWhenLoaded(" + postid + ")", 650);
}

function ajaxHideComments(postid) {
	setTimeout("itemDisplay('show-inline-comments-" + postid + "', 'inline')", 600);
	itemDisplay('hide-inline-comments-' + postid, 'none');
	myAjaxDivs[postid].toggle('height');
}

function itemDisplay(item, display) {
	document.getElementById(item).style.display = display;
}

function ajaxDisplayWhenLoaded(postid) {

	if ( document.getElementById('ajax-comments-' + postid).innerHTML.length < 100 ) {
		setTimeout("ajaxDisplayWhenLoaded(" + postid + ")", 10);
		return;
	} else {
		setTimeout("myAjaxDivs[" + postid + "].toggle('height')", 10);
		document.getElementById('ajax-comments-notification-' + postid).innerHTML = '';
		setTimeout("itemDisplay('hide-inline-comments-" + postid + "', 'inline')", 600);
	}
}

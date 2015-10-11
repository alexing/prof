/* This script requires jquery and jquery.cookie to run properly
 * Wrote by Mauricio Gutierrez (mgutierrez[at]4thoughtmarketing.com) from 4ThoughtMarketing to Cybersource
 * v1.2 */

var cookieName="elqQs";								//The name of the cookie
var duration=1;										//Cookie duration in days
var separator=","									//The cookie-values will be concatenated using this separator
var cidHTMLName="hiddenCampaignId,elqCampaignId";	//The HTML name for the Campaign ID Field. If there are various fields with the same purpose, indicate them separated by commas (campaignId,C_Campaign_ID)
var dcidHTMLName="driverCampaignID,elqDriverCampaignId";//The HTML name for the Driver Campaign ID Field. If there are various fields with the same purpose, indicate them separated by commas (driverCampaignId,C_DriverCampaignID)
var lsrHTMLName="LeadSource,elqLeadSource";			//The HTML name for the Lead Source Field. If there are various fields with the same purpose, indicate them separated by commas (leadSource,C_LeadSource)
var pLocHTMLName="location,elqLocation";							//The HTML name for the first page loaded by the user, this may have querystrings. If there are various fields with the same purpose, indicate them separated by commas (Location,FirstPageURL)
var wRefHTMLName="referrer,elqReferrer"										//The HTML name for the referrer. It usually is a search engine, may be something else. If there are various fields with the same purpose, indicate them separated by commas (referrer,visitSource)
var inputType="hidden";
//var inputType="text";
var privacyPolicyURL="http://www.cybersource.com/en-EMEA/privacy";
var cookieDomain="cybersource";
var domainExtension=".com";
var altSeparator=".";
try{
	separator=="."?altSeparator=",":"";
}
catch(e){
}

$(function(){
	setQSValuesInCookie();
	cookieToHiddenFields();
	frmPrepopulation();
	setSkyColor();
	privacyPolicyToLink();
});

function setQSValuesInCookie(){
	var cid=getParameterByName('cid');
	if(cid && cid.length>0){
		writeValueInCookie('cid', cid);
	}
	var dcid=getParameterByName('dcid');
	if(dcid && dcid.length>0){
		writeValueInCookie('dcid', dcid);
	}
	var lsr=getParameterByName('lsr');
	if(lsr && lsr.length>0){
		writeValueInCookie('lsr', lsr);
	}
	var existingQS=$.cookie(cookieName);
	(existingQS && existingQS.length>0)?existingQS=existingQS.split(separator):existingQS="";
	var localReferrer = document.referrer.replace(new RegExp(separator, 'g'), altSeparator);
	var updateReferrer = (document.referrer.length>0 && document.referrer.split('.').length>0 && document.referrer.split('.')[0].indexOf(cookieDomain)==-1 && document.referrer.split('.')[1].indexOf(cookieDomain)==-1);
	if(updateReferrer){
		writeValueInCookie('referrer', localReferrer);
	}
	var localScpLocation = document.location.href.replace(new RegExp(separator, 'g'), altSeparator);
	var writeLocation = existingQS.length<4 || existingQS[4].length==0;
	if(writeLocation){
		writeValueInCookie('location', localScpLocation);
	}
	/*if(cid || dcid || lsr){
		if(existingQS && existingQS.length>0){	//Upd the existing cookie
			if(updateReferrer && writeLocation){
				if(cid && dcid && lsr){
					$.cookie(cookieName, cid+separator+dcid+separator+lsr+separator+localReferrer+separator+localScpLocation, { expires: duration, path: '/', domain:"."+cookieDomain+domainExtension });
				}else{
					if(cid){
						$.cookie(cookieName, cid+separator+existingQS[1]+separator+existingQS[2]+separator+localReferrer+separator+localScpLocation, { expires: duration, path: '/', domain:"."+cookieDomain+domainExtension });
					}
					if(dcid){
						$.cookie(cookieName, existingQS[0]+separator+dcid+separator+existingQS[2]+separator+localReferrer+separator+localScpLocation, { expires: duration, path: '/', domain:"."+cookieDomain+domainExtension });
					}
					if(lsr){
						$.cookie(cookieName, existingQS[0]+separator+existingQS[1]+separator+lsr+separator+localReferrer+separator+localScpLocation, { expires: duration, path: '/', domain:"."+cookieDomain+domainExtension });
					}
				}
			}else if(updateReferrer){
				if(cid && dcid && lsr){
					$.cookie(cookieName, cid+separator+dcid+separator+lsr+separator+localReferrer+separator+existingQS[4], { expires: duration, path: '/', domain:"."+cookieDomain+domainExtension });
				}else{
					if(cid){
						$.cookie(cookieName, cid+separator+existingQS[1]+separator+existingQS[2]+separator+localReferrer+separator+existingQS[4], { expires: duration, path: '/', domain:"."+cookieDomain+domainExtension });
					}
					if(dcid){
						$.cookie(cookieName, existingQS[0]+separator+dcid+separator+existingQS[2]+separator+localReferrer+separator+existingQS[4], { expires: duration, path: '/', domain:"."+cookieDomain+domainExtension });
					}
					if(lsr){
						$.cookie(cookieName, existingQS[0]+separator+existingQS[1]+separator+lsr+separator+localReferrer+separator+existingQS[4], { expires: duration, path: '/', domain:"."+cookieDomain+domainExtension });
					}
				}
			} else if(writeLocation){
				if(cid && dcid && lsr){
					$.cookie(cookieName, cid+separator+dcid+separator+lsr+separator+existingQS[3]+separator+localScpLocation, { expires: duration, path: '/', domain:"."+cookieDomain+domainExtension });
				}else{
					if(cid){
						$.cookie(cookieName, cid+separator+existingQS[1]+separator+existingQS[2]+separator+existingQS[3]+separator+localScpLocation, { expires: duration, path: '/', domain:"."+cookieDomain+domainExtension });
					}
					if(dcid){
						$.cookie(cookieName, existingQS[0]+separator+dcid+separator+existingQS[2]+separator+existingQS[3]+separator+localScpLocation, { expires: duration, path: '/', domain:"."+cookieDomain+domainExtension });
					}
					if(lsr){
						$.cookie(cookieName, existingQS[0]+separator+existingQS[1]+separator+lsr+separator+existingQS[3]+separator+localScpLocation, { expires: duration, path: '/', domain:"."+cookieDomain+domainExtension });
					}
				}
			}
			else{
				if(cid && dcid && lsr){
					$.cookie(cookieName, cid+separator+dcid+separator+lsr+separator+existingQS[3]+separator+existingQS[4], { expires: duration, path: '/', domain:"."+cookieDomain+domainExtension });
				}else{
					if(cid){
						$.cookie(cookieName, cid+separator+existingQS[1]+separator+existingQS[2]+separator+existingQS[3]+separator+existingQS[4], { expires: duration, path: '/', domain:"."+cookieDomain+domainExtension });
					}
					if(dcid){
						$.cookie(cookieName, existingQS[0]+separator+dcid+separator+existingQS[2]+separator+existingQS[3]+separator+existingQS[4], { expires: duration, path: '/', domain:"."+cookieDomain+domainExtension });
					}
					if(lsr){
						$.cookie(cookieName, existingQS[0]+separator+existingQS[1]+separator+lsr+separator+existingQS[3]+separator+existingQS[4], { expires: duration, path: '/', domain:"."+cookieDomain+domainExtension });
					}
				}
			}
		}else{	//Create a new cookie
			if(updateReferrer && writeLocation){
				$.cookie(cookieName, cid+separator+dcid+separator+lsr+separator+localReferrer+separator+localScpLocation, { expires: duration, path: '/', domain:"."+cookieDomain+domainExtension });
			}else if(updateReferrer){
				$.cookie(cookieName, cid+separator+dcid+separator+lsr+separator+localReferrer+separator+"", { expires: duration, path: '/', domain:"."+cookieDomain+domainExtension });
			} else if(writeLocation){
				$.cookie(cookieName, cid+separator+dcid+separator+lsr+separator+""+separator+localScpLocation, { expires: duration, path: '/', domain:"."+cookieDomain+domainExtension });
			}
			else{
				$.cookie(cookieName, cid+separator+dcid+separator+lsr+separator+""+separator+"", { expires: duration, path: '/', domain:"."+cookieDomain+domainExtension });
			}
		}
	}else{
		if(existingQS && existingQS.length>0){	//Upd the existing cookie
			if(updateReferrer && writeLocation){
				$.cookie(cookieName, existingQS[0]+separator+existingQS[1]+separator+existingQS[2]+separator+localReferrer+separator+localScpLocation, { expires: duration, path: '/', domain:"."+cookieDomain+domainExtension });
			}else if(updateReferrer){
				$.cookie(cookieName, existingQS[0]+separator+existingQS[1]+separator+existingQS[2]+separator+localReferrer+separator+existingQS[4], { expires: duration, path: '/', domain:"."+cookieDomain+domainExtension });
			} else if(writeLocation){
				$.cookie(cookieName, existingQS[0]+separator+existingQS[1]+separator+existingQS[2]+separator+existingQS[3]+separator+localScpLocation, { expires: duration, path: '/', domain:"."+cookieDomain+domainExtension });
			}
			else{
				//Nothing to update in the cookie
			}
		}else{	//Create a new cookie
			if(updateReferrer && writeLocation){
				$.cookie(cookieName, ""+separator+""+separator+""+separator+localReferrer+separator+localScpLocation, { expires: duration, path: '/', domain:"."+cookieDomain+domainExtension });
			}else if(updateReferrer){
				$.cookie(cookieName, ""+separator+""+separator+""+separator+localReferrer+separator+"", { expires: duration, path: '/', domain:"."+cookieDomain+domainExtension });
			} else if(writeLocation){
				$.cookie(cookieName, ""+separator+""+separator+""+separator+""+separator+localScpLocation, { expires: duration, path: '/', domain:"."+cookieDomain+domainExtension });
			}
			else{
				//No data to write in the new cookie
			}
		}
	}*/
}

function writeValueInCookie(varName, valueToWrite){
	var cky=$.cookie(cookieName);
	if(cky && cky.length>0){
		cky=cky.split(separator);
	}
	else{
		$.cookie(cookieName, ""+separator+""+separator+""+separator+""+separator+"", { expires: duration, path: '/', domain:"."+cookieDomain+domainExtension });
		cky=$.cookie(cookieName);
		cky=cky.split(separator);
	}
	if(!varInCookieHasValue(varName)){	//Update the value in the cookie
		switch(varName){
			case "cid":
				$.cookie(cookieName, valueToWrite+separator+cky[1]+separator+cky[2]+separator+cky[3]+separator+cky[4], { expires: duration, path: '/', domain:"."+cookieDomain+domainExtension });
			break;
			case "dcid":
				$.cookie(cookieName, cky[0]+separator+valueToWrite+separator+cky[2]+separator+cky[3]+separator+cky[4], { expires: duration, path: '/', domain:"."+cookieDomain+domainExtension });
			break;
			case "lsr":
				$.cookie(cookieName, cky[0]+separator+cky[1]+separator+valueToWrite+separator+cky[3]+separator+cky[4], { expires: duration, path: '/', domain:"."+cookieDomain+domainExtension });
			break;
			case "referrer":
				$.cookie(cookieName, cky[0]+separator+cky[1]+separator+cky[2]+separator+valueToWrite+separator+cky[4], { expires: duration, path: '/', domain:"."+cookieDomain+domainExtension });
			break;
			case "location":
				$.cookie(cookieName, cky[0]+separator+cky[1]+separator+cky[2]+separator+cky[3]+separator+valueToWrite, { expires: duration, path: '/', domain:"."+cookieDomain+domainExtension });
			break;
			default:
			break;
		}
	}
}

function varInCookieHasValue(varName){
	var ck=$.cookie(cookieName);
	if(ck && ck.length>0){
		ck=ck.split(separator);
		switch(varName){
			case "cid":
				return (ck[0].length>0 && ck[0]!="null");
			break;
			case "dcid":
				return (ck[1].length>0 && ck[1]!="null");
			break;
			case "lsr":
				return (ck[2].length>0 && ck[2]!="null");
			break;
			case "referrer":
				return (ck[3].length>0 && ck[3]!="null");
			break;
			case "location":
				return (ck[4].length>0 && ck[4]!="null");
			break;
			default:
			break;
		}
	}
	return false;
}

function cookieToHiddenFields(){
	var cookieQS=$.cookie(cookieName);
	if(cookieQS && cookieQS.length){
		cookieQS=cookieQS.split(separator);
		$('form').each(function(i) {
			var actionUrl=$(this).attr("action");
			if(actionUrl && actionUrl.indexOf('eloqua')!=-1){
				var cidVal=cookieQS[0];
				if(cidVal && cidVal.length && cidVal!="null"){
					var cidArr=cidHTMLName.split(',');
					for(i in cidArr){
						var cidSelector=$(this).find('input[name='+cidArr[i].trim()+']');
						if(cidSelector && cidSelector.length){
							cidSelector.val(cidVal);
						}else if(inputType=="text")
							$(this).append('<div>'+cidArr[i].trim()+' <input type='+inputType+' name="'+cidArr[i].trim()+'" value="'+cidVal+'" /></div>');
						else
							$(this).append('<input type='+inputType+' name="'+cidArr[i].trim()+'" value="'+cidVal+'" />');
					}
				}
				var dcidVal = cookieQS[1];
				if(dcidVal && dcidVal.length && dcidVal!="null"){
					var dcidArr=dcidHTMLName.split(',');
					for(i in dcidArr){
						var dcidSelector=$(this).find('input[name='+dcidArr[i]+']');
						if(dcidSelector && dcidSelector.length){
							dcidSelector.val(dcidVal);
						}else if(inputType=="text")
							$(this).append('<div>'+dcidArr[i]+' <input type='+inputType+' name="'+dcidArr[i]+'" value="'+dcidVal+'" /></div>');
						else
								$(this).append('<input type='+inputType+' name="'+dcidArr[i]+'" value="'+dcidVal+'" />');
					}
				}
				var lsrVal=cookieQS[2];
				if(lsrVal && lsrVal.length && lsrVal!="null"){
					var lsrArr=lsrHTMLName.split(',');
					for(i in lsrArr){
						var lsrSelector=$(this).find('input[name='+lsrArr[i]+']');
						if(lsrSelector && lsrSelector.length){
							lsrSelector.val(lsrVal);
						}else if(inputType=="text")
							$(this).append('<div>'+lsrArr[i]+' <input type='+inputType+' name="'+lsrArr[i]+'" value="'+lsrVal+'" /></div>');
						else
							$(this).append('<input type='+inputType+' name="'+lsrArr[i]+'" value="'+lsrVal+'" />');
					}
				}
				var refVal=cookieQS[3];
				if(refVal && refVal.length && refVal!="null"){
					var refValArr=wRefHTMLName.split(',');
					for(i in refValArr){
						var refSelector=$(this).find('input[name='+refValArr[i]+']');
						if(refSelector && refSelector.length){
							refSelector.val(refVal);
						}else if(inputType=="text")
							$(this).append('<div>'+refValArr[i]+' <input type='+inputType+' name="'+refValArr[i]+'" value="'+refVal+'" /></div>');
						else
							$(this).append('<input type='+inputType+' name="'+refValArr[i]+'" value="'+refVal+'" />');
					}
				}
				var locVal=cookieQS[4];
				if(locVal && locVal.length && locVal!="null"){
					var locValArr=pLocHTMLName.split(',');
					for(i in locValArr){
						var locSelector=$(this).find('input[name='+locValArr[i]+']');
						if(locSelector && locSelector.length){
							locSelector.val(locVal);
						}else if(inputType=="text")
							$(this).append('<div>'+locValArr[i]+' <input type='+inputType+' name="'+locValArr[i]+'" value="'+locVal+'" /></div>');
						else
							$(this).append('<input type='+inputType+' name="'+locValArr[i]+'" value="'+locVal+'" />');
					}
				}
			}
		});
	}
}

function frmPrepopulation(){
	var guid = $.cookie("CYBSGUID");
	if(guid && guid.length){
		var eqScript = 'http://now.eloqua.com/visitor/v200/svrGP.aspx?pps=50&siteid=998&DLKey=' + escape('812d2ecf4aa348e885f764631a3b42e3') + '&DLLookup=<C_CYBS_GUID1>' + guid + '</C_CYBS_GUID1>';
		$.getScript(eqScript, getContactInfo);
	}else{
		var eml = getParameterByName('em');
		if(!eml && "<span class=eloquaemail>EmailAddress</span>".indexOf('@')!=-1){
			eml="<span class=eloquaemail>EmailAddress</span>";
		}
		if(eml && eml.length){
			var eqScript = 'http://now.eloqua.com/visitor/v200/svrGP.aspx?pps=50&siteid=998&DLKey=' + escape('db1a625e5037478aabd0d8519841e3dc') + '&DLLookup=<C_EmailAddress>' + eml + '</C_EmailAddress>';
			$.getScript(eqScript, getContactInfo);
		}
	}
}

function getContactInfo() {
	try {
		var email = GetElqContentPersonalizationValue('C_EmailAddress');
		if(email){
			setValueInField(email, 'C_EmailAddress');
			setValueInField(email, 'emailAddress');
		}
		
		var fn = GetElqContentPersonalizationValue('C_FirstName');
		if(fn){
			setValueInField(fn, "C_FirstName");
			setValueInField(fn, 'firstName');
		}
		
		var ln = GetElqContentPersonalizationValue('C_LastName');
		if(ln){
			setValueInField(ln, 'C_LastName');
			setValueInField(ln, 'lastName');
		}
		
		var tl = GetElqContentPersonalizationValue('C_Title');
		if(tl){
			setValueInField(tl, 'C_Title');
			setValueInField(tl, 'title');
		}
		
		var cp = GetElqContentPersonalizationValue('C_Company');
		if(cp){
			setValueInField(cp, 'C_Company');
			setValueInField(cp, 'company');
		}
		
		var bp = GetElqContentPersonalizationValue('C_BusPhone');
		if(bp){
			setValueInField(bp, 'C_BusPhone');
			setValueInField(bp, 'busPhone');
		}
		
		var cnt = GetElqContentPersonalizationValue('C_Country');
		if(cnt){
			setValueInField(cnt, 'C_Country', 'select');
			setValueInField(cnt, 'country', 'select');
		}
		
		var zip = GetElqContentPersonalizationValue('C_Zip_Postal');
		if(zip){
			setValueInField(zip, 'C_Zip_Postal');
			setValueInField(zip, 'zipPostal');
		}

		var state = GetElqContentPersonalizationValue('C_State_Prov');
		if(state){
			setValueInField(state, 'C_State_Prov');
			setValueInField(state, 'stateProv');
		}
			
		var city = GetElqContentPersonalizationValue('C_City');
		if(city){
			setValueInField(city, 'C_City');
			setValueInField(city, 'city');
		}
		
		var web = GetElqContentPersonalizationValue('C_Website');
		if(web){
			setValueInField(web, 'C_Website');
			setValueInField(web, 'website');
		}
		
		var onlineRv = GetElqContentPersonalizationValue('C_Online_Rev_Yr1');
		if(onlineRv){
			setValueInField(onlineRv, 'C_Annual_Revenue1', 'select');
			setValueInField(onlineRv, 'onlineRevYr1', 'select');
		}
		
		var monthTr = GetElqContentPersonalizationValue('C_Monthly_Online_Transactions1');
		if(monthTr){
			setValueInField(monthTr, 'C_Monthly_Online_Transactions1', 'select');
			setValueInField(monthTr, 'monthlyOnlineTransactions1', 'select');
		}
		
		var jobF = GetElqContentPersonalizationValue('C_Job_Function1');
		if(jobF){
			setValueInField(jobF, 'C_Job_Function1', 'select');
			setValueInField(jobF, 'jobFunction1', 'select');
		}
		
		var jobL = GetElqContentPersonalizationValue('C_Job_Level1');
		if(jobL){
			setValueInField(jobL, 'C_Job_Level1', 'select');
			setValueInField(jobL, 'jobLevel1', 'select');
		}
		
		var adr1 = GetElqContentPersonalizationValue('C_Address1');
		if(adr1){
			setValueInField(adr1, 'C_Address1');
			setValueInField(adr1, 'address1');
		}
	}
	catch(err){}
}

function setValueInField(value, field, fieldType){
	if(fieldType && fieldType.length)
		var myField=$(fieldType+'[name="'+field+'"]');
	else
		var myField=$('input[name="'+field+'"]');
	if(myField && myField.length){
		myField.val(value);
		return true;
	}
	return false;
}

function setSkyColor(){
	if(setValueInField('blue','skyColor'))
		$("input[name=skyColor]").closest("div").hide();
}

function privacyPolicyToLink(){
	try{
		var ppol=$('label:contains("Privacy Policy")');
		if(ppol && ppol.length){
			var ppText=ppol[0].outerHTML.replace("Privacy Policy", '<a href='+privacyPolicyURL+' target="_blank">Privacy Policy</a>');
			ppol.replaceWith(ppText);
		}else{
			var ppol=$('label:contains("privacy policy")');
			if(ppol && ppol.length){
				var ppText=ppol[0].outerHTML.replace("privacy policy", '<a href='+privacyPolicyURL+' target="_blank">Privacy Policy</a>');
				ppol.replaceWith(ppText);
			}
		}
	}
	catch(err){
	}
}

function getParameterByName(name) {
	var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
	match = match ? decodeURIComponent(match[1].replace(/\+/g, ' ')) : null;
	if(match && match.length>0){
		return match.match(/[^a-z0-9\-\_]/gi)==null?match:null;
	}
	return null;
}

var host = document.location.host.toString().toLowerCase();

function autotag() 
{
	for (var i=0; i<document.links.length; i++ )
	{
		iLink = document.links[i];
		if (iLink.href.toLowerCase().indexOf(host) == -1) 
		{
			if (iLink.target == "_blank" || popUp(iLink))
			{
				if(iLink.onclick == "" || iLink.onclick == null)
				{	
					iLink.onclick = function() {ntptEventTag('ev=externallink&externallink=' + encodeURIComponent(this.href));};
				}	
				else
				{
					if(window.attachEvent)
					{
						iLink.tmpclick = iLink.onclick;
						iLink.onclick = function() {ntptEventTag('ev=externallink&externallink=' + encodeURIComponent(this.href)); return this.tmpclick();};
					}
					else
						EV(iLink, "click", function() {ntptEventTag('ev=externallink&externallink=' + encodeURIComponent(this.href));});
				}
			}
			else
			{					
				if(iLink.onclick == "" || iLink.onclick == null)
					iLink.onclick = function() { ntptEventTag('ev=externallink&externallink=' + encodeURIComponent(this.href)); nipause(500); };
				else
				{
					if (window.attachEvent)
					{
						iLink.tmpclick = iLink.onclick;
						iLink.onclick = function() { ntptEventTag('ev=externallink&externallink=' + encodeURIComponent(this.href)); return this.tmpclick(); nipause(500); };
					}
					else
						EV(iLink, "click", function() { ntptEventTag('ev=externallink&externallink=' + encodeURIComponent(this.href)); nipause(500); });
				}	
			}
		}
	};
}

function popUp(linkobj)
{
	if (linkobj.onclick != undefined)
		if (linkobj.onclick.toString().toLowerCase().indexOf("window.open") > -1) 
			return true; 
		else
			return false;
	else
		return false;
}

function EV(a,b,c,d)
{
    if(a.addEventListener)
    {
    	a.addEventListener(b,c,false)
    }
    else if(a.attachEvent)
    {
    	a.attachEvent(((d==1)?"":"on")+b,c)
    }
}

function nipause(ms){
  var date = new Date();
  var curDate = null;
   do {
      curDate = new Date();
      }
   while(curDate-date < ms);
}

EV(window,"load", autotag);
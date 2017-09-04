const extensionOrigin = 'chrome-extension://' + chrome.runtime.id;
if (!location.ancestorOrigins.contains(extensionOrigin)) {
    document.querySelectorAll('.rc').forEach(function(el) {
    	let elURL = el.childNodes[0].childNodes[0].href;
    	let logo = 'https://www.shareicon.net/data/256x256/2015/09/10/98764_facebook_512x512.png';
    	
    	let iframe = document.createElement('iframe');
	    iframe.className = 'fbshare-iframe';
	    iframe.style.cssText = 'position:relative;top:0;left:0;display:block;' +
	                       'width:560px;height:32px;z-index:1000;border: 0;box-shadow: 0 0 1px rgba(0,0,0,.15);overflow:hidden;';
		el.appendChild(iframe);
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'https://fbsharecount.now.sh/?url=' + elURL);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.onload = function() {
		    if (xhr.status === 200) {
		    	let share = JSON.parse(xhr.responseText);
		        let contentOM = `
				<html>
				<head>
					<style>
						#root {
							padding: 0.4rem;
							color: green;
						}
					</style>
				</head>
				<body style="margin:0;padding:0;height:32px;background-color:#fafafa;">
				<div id="root"><img style="height:1.2em" src="`+logo+`" alt="fblogo"><strong style="vertical-align: bottom;padding-left: .2rem;">`+share.Count+` total shares</strong></div>
				</body>
				</html>`;
				let doc = iframe.contentWindow.document; doc.open(); doc.writeln(contentOM); doc.close();
		    }
		    else {
		        console.log('Request failed.  Returned status of ' + xhr.status);
		    }
		};
		xhr.send();
	});
}
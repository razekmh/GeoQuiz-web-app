// The code is adopted from the web and mobile module practicals
//load basic functions of the page
function startup() {
	document.addEventListener('DOMContentLoaded', function() {
        loadmap();
        loadquestions();
		}, false);
    };
    
getPort();
startup();